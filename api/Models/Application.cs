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
        public string Description { get; set; }
        public int CvId { get; set; }
        public CV CV { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public int JobOfferId { get; set; }
        public JobOffer JobOffer { get; set; }
        public int? TestId { get; set; }
        public Test? Test { get; set; }

    }

    public class CV
    {
        public int Id { get; set; }
        public string CvFileName { get; set; }
        public byte[] CvData { get; set; }
    }
}