using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AppalicationDto
{
    public class GetClassificationGroupDto
    {
        public string JobTitle { get; set; }
        public List<GetClassificationDto> Applications { get; set; }
    }
}