using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.CompilerDto
{
    public class CompileRequest
    {
        public string Language { get; set; }
        public string Code { get; set; }
    }
}