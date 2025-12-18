using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AppalicationDto
{
    public class GetSummaryDto
    {
        public string UserId { get; set; }
        public List<ApplicationSummary> Applications {get;set;}= new List<ApplicationSummary>();
    }

    public class ApplicationSummary
    {
        public string JobTitle { get; set; }
        public string Status { get; set; }
    }
}