using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class JobOfferQueryObject
    {
        public string? JobTitle { get; set; } = null;
        public string? Language { get; set; }=null;
    }
}