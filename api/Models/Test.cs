using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Test
    {
        public int Id { get; set; }
        public string Tittle { get; set; }
        public string Description { get; set; }
        public ICollection<TestTask> TestTasks { get; set; } = new List<TestTask>();
    }
}