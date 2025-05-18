using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AppalicationDto
{
    public class GetApplicationDto
    {
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public string? CV { get; set; }
        public string JobOfferTitle { get; set; }
    }
}