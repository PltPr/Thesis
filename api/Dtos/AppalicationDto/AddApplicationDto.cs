using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.AppalicationDto
{
    public class AddApplicationDto
    {
        public string? CV { get; set; }
        public int JobOfferId { get; set; }
    }
}