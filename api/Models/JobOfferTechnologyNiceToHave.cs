using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class JobOfferTechnologyNiceToHave
    {
        public int JobOfferId { get; set; }
        [ForeignKey("JobOfferId")]
        public JobOffer JobOffer { get; set; }
        public int TechnologyIdNiceToHave { get; set; }
        [ForeignKey("TechnologyIdNiceToHave")]
        public Technology Technology { get; set; }
    }
}