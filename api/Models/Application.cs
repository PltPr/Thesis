using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Application
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public string? CV { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int JobOfferId { get; set; }
        public JobOffer JobOffer { get; set; }

    }
}