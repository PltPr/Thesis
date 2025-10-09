using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppalicationDto;
using api.Dtos.NoteMessageDto;
using api.Models;

namespace api.Mappers
{
    public static class NoteMessageMappers
    {
        public static Note ToNote(this AddNoteDto model, string adderId)
        {
            return new Note
            {
                Content = model.Content,
                Date = DateTime.Now,
                AdderId = adderId,
                ApplicationId = model.ApplicationId
            };
        }
        public static GetNoteDto ToNoteDto(this Note model)
        {
            return new GetNoteDto
            {
                Id = model.Id,
                Content = model.Content,
                Date = model.Date,
                Adder = $"{model.Adder.Name} {model.Adder.Surname}"
            };
        }
        public static Message ToMessage(this AddMessageDto model, string adderId)
        {
            return new Message
            {
                Content = model.Content,
                Date = DateTime.Now,
                AdderId = adderId,
                ApplicationId = model.ApplicationId
            };
        }
        public static GetMessageDto ToMessageDto(this Message model)
        {
            return new GetMessageDto
            {
                Id = model.Id,
                Content = model.Content,
                Date = model.Date,
                Adder = $"{model.Adder.Name} {model.Adder.Surname}"
            };
        }
    }
}