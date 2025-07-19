using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.TestDto
{
    public class TestDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public List<int> TaskIds { get; set; } = new List<int>();
    }
}