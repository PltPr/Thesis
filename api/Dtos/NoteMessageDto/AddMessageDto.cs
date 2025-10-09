using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.NoteMessageDto
{
    public class AddMessageDto
    {
        public string Content { get; set; }
        public int ApplicationId { get; set; }
    }
}