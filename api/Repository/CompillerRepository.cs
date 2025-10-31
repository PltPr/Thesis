using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.CompilerDto;
using api.Interfaces;

namespace api.Repository
{
    public class CompillerRepository : ICompillerRepository
    {
        private static readonly ConcurrentDictionary<string, Process> _activeProcesses = new();
        public async Task<CompileResult> CompileAsync(CompileRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Code) || string.IsNullOrWhiteSpace(request.Language))
                return new CompileResult { Success = false, Error = "Language and code are required" };

            var processId = Guid.NewGuid().ToString();

            
                var tempFolder = Path.Combine("Temp", Guid.NewGuid().ToString());
                Directory.CreateDirectory(tempFolder);

                var fileName = GetDefaultFileName(request.Language);
                var filePath = Path.Combine(tempFolder, fileName);

                await File.WriteAllTextAsync(filePath, request.Code);

                string dockerFileContent;
                try
                {
                    dockerFileContent = GetDockerfileForLanguage(request.Language, fileName);
                }
                catch (Exception ex)
                {
                    Cleanup(tempFolder);
                    return new CompileResult { Success = false, Error = ex.Message };
                }

                var dockerFilePath = Path.Combine(tempFolder, "Dockerfile");
                await File.WriteAllTextAsync(dockerFilePath, dockerFileContent);

                var imageTag = $"temp.{Guid.NewGuid():N}";

                var buildResult = await RunProcessAsync("docker", $"build -t {imageTag} \"{tempFolder}\"",processId);
                if (buildResult.ExitCode != 0)
                {
                Cleanup(tempFolder);
                    
                return new CompileResult
                {
                    Success = false,
                    ProcessId = processId,
                    Output = buildResult.Output,
                    Error = buildResult.Error
                };
            }
            var runResult = await RunProcessAsync("docker", $"run --rm {imageTag}", processId);
            Cleanup(tempFolder);



            return new CompileResult
            {
                Success = runResult.ExitCode == 0,
                ProcessId = processId,
                Output = runResult.Output,
                Error = runResult.ExitCode != 0 ? runResult.Error : null
            };
        }
        private string GetDefaultFileName(string language)
        {
            return language.ToLower() switch

            {
                "java" => "Main.java",
                "python" => "main.py",
                "csharp" => "TempProgram.cs",
                "cpp" => "main.cpp",
                _ => throw new Exception($"Unsupported language {language}")
            };
        }
        private string GetDockerfileForLanguage(string language, string fileName)
        {
            language = language.ToLower();
            return language switch
            {
                "java" => @$"
                    FROM openjdk:17-slim
                    WORKDIR /app
                    COPY . /app
                    RUN javac {fileName}
                    CMD [""java"", ""{Path.GetFileNameWithoutExtension(fileName)}""]",

                "python" => @$"
                    FROM python:3.11-slim
                    WORKDIR /app
                    COPY . /app
                    CMD [""python"", ""{fileName}""]",

                "csharp" => @$"
                    FROM mcr.microsoft.com/dotnet/sdk:8.0
                    WORKDIR /app
                    COPY . /app
                    RUN dotnet new console -n App --force
                    RUN mv {fileName} App/Program.cs
                    WORKDIR /app/App
                    RUN dotnet build
                    CMD [""dotnet"", ""run"", ""--no-build""]",

                "cpp" => @$"
                    FROM gcc:13.2
                    WORKDIR /app
                    COPY . /app
                    RUN g++ {fileName} -o app.out
                    CMD [""./app.out""]",

                _ => throw new Exception($"Unsupported language: {language}")
            };
        }
        private async Task<(int ExitCode, string Output, string Error)> RunProcessAsync(string fileName, string arguments, string procesId)
        {
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = fileName,
                    Arguments = arguments,
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };
            _activeProcesses[procesId] = process;

            process.Start();
            var output = await process.StandardOutput.ReadToEndAsync();
            var error = await process.StandardError.ReadToEndAsync();
            process.WaitForExit();
            _activeProcesses.TryRemove(procesId, out _);

            return (process.ExitCode, output, error);
        }
        private void Cleanup(string folderPath)
        {
            try
            {
                if (Directory.Exists(folderPath))
                    Directory.Delete(folderPath, true);
            }
            catch
            {
                
            }
        }

        public bool KillProcess(string procesId)
        {
            if (_activeProcesses.TryGetValue(procesId, out var process))
            {
                try
                {
                    if (!process.HasExited)
                    {
                        process.Kill(entireProcessTree: true);
                        _activeProcesses.TryRemove(procesId, out _);
                        return true;
                    }
                }
                catch { }
            }
            return false;
        }
    }
}