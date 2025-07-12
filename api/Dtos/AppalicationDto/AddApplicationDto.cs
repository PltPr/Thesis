using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.AppalicationDto
{
    public class AddApplicationDto
    {
        public string Description { get; set; }
        public IFormFile? CV { get; set; }
        public int JobOfferId { get; set; }
    }
}