using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AppalicationDto
{
    public class GetApplicationDto
    {
        public string JobOfferTitle { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int CvId { get; set; }
        public string CvFileName { get; set; }
        public string Status { get; set; }
        public int? TestId { get; set; }
        
    }
}