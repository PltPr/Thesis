using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class TestTask
    {
        public int TestId { get; set; }
        public Test Test { get; set; }
        public int TaskId { get; set; }
        public TaskItem Task { get; set; }
    }
}