using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AppalicationDto
{
    public class GetApplicationDto
    {
        public int Id { get; set; }
        public string JobOfferTitle { get; set; }
        public string? AboutYourself { get; set; }
        public string SimilarExperience { get; set; }
        public string ExpectedMonthlySalary { get; set; }
        public DateTime Date { get; set; }
        public int CvId { get; set; }
        public string CvFileName { get; set; }
        public string Status { get; set; }
        public int? TestId { get; set; }
        public DateTime? AssignTestDate { get; set; }
        
    }
}