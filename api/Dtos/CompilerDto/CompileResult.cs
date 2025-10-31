using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.CompilerDto
{
    public class CompileResult
    {
        public string ProcessId { get; set; }
        public bool Success { get; set; }
        public string? Output { get; set; }
        public string? Error { get; set; }
    }
}