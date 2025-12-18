using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.JobOfferDto
{
    public class DeleteTechnologyDto
    {
        public int JobOfferId { get; set; }
        public string TechnologyName { get; set; } = string.Empty;
        public string Type { get; set; }
    }
}