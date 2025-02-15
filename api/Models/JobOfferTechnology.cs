using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;



namespace api.Models
{
    public class JobOfferTechnology
    {
        public int JobOfferId { get; set; }
        [ForeignKey("JobOfferId")]
        public JobOffer JobOffer { get; set; }

        public int TechnologyId { get; set; }
        [ForeignKey("TechnologyId")]
        public Technology Technology { get; set; }

        
    }
}
