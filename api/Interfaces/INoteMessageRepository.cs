using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface INoteMessageRepository
    {
        Task<Note> AddNoteAsync(Note model);
        Task<Note?> GetNoteByIdAsync(int id);
        Task<Message> AddMessageAsync(Message model);
        Task<Message?> GetMessageByIdAsync(int id);
        Task<List<Message>?> GetMessagesForAppAsync(int appId);
        Task<List<Note>?> GetAllNotesForAppAsync(int appId);
    }
}