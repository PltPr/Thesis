using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;



namespace api.Models
{
    public class JobOfferTechnologyRequired
    {
        public int JobOfferId { get; set; }
        [ForeignKey("JobOfferId")]
        public JobOffer JobOffer { get; set; }
        public int TechnologyIdRequired { get; set; }
        [ForeignKey("TechnologyIdRequired")]
        public Technology Technology { get; set; }

        
    }
}
