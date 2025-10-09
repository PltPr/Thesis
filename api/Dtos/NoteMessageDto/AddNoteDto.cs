using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AppalicationDto
{
    public class AddNoteDto
    {
        public string Content { get; set; }
        public int ApplicationId { get; set; }
    }
}