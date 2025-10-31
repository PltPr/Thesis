using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.CompilerDto;

namespace api.Interfaces
{
    public interface ICompillerRepository
    {
        Task<CompileResult> CompileAsync(CompileRequest request);
        bool KillProcess(string procesId);
    }
}