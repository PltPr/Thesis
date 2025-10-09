using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string AdderId { get; set; }
        [ForeignKey("AdderId")]
        public AppUser Adder { get; set; }
        
        public Application Application { get; set; }
        public int ApplicationId { get; set; }
    }
    public class Message
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string AdderId { get; set; }
        [ForeignKey("AdderId")]
        public AppUser Adder { get; set; }
        public Application Application { get; set; }
        public int ApplicationId { get; set; }
    }
}