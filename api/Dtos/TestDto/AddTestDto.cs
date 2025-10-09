using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.TestDto
{
    public class AddTestDto
    {
        public string Tittle { get; set; }
        public string Description { get; set; }
        public List<int> TaskIds { get; set; } = new List<int>();
    }
}