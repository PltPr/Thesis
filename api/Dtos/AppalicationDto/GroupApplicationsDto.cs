using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AppalicationDto
{
    public class GroupApplicationsDto
    {
        public string JobOfferTitle { get; set; }
        public List<GroupedApps> applications { get; set; }
    }

    public class GroupedApps
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int CvId { get; set; }
        public string CvFileName { get; set; }
        public string Status { get; set; }
        public int? TestId { get; set; }
        public DateTime? AssignTestDate { get; set; }
    }
}