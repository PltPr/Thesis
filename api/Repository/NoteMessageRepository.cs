using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class NoteMessageRepository : INoteMessageRepository
    {
        private readonly ApplicationDBContext _context;
        public NoteMessageRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Message> AddMessageAsync(Message model)
        {
            await _context.Messages.AddAsync(model);
            await _context.SaveChangesAsync();

            await _context.Entry(model).Reference(m => m.Adder).LoadAsync();

            return model;
        }

        public async Task<Note> AddNoteAsync(Note model)
        {
            await _context.Notes.AddAsync(model);
            await _context.SaveChangesAsync();

            await _context.Entry(model).Reference(n => n.Adder).LoadAsync();

            return model;
        }

        public async Task<Message?> GetMessageByIdAsync(int id)
        {
            var result = await _context.Messages.Include(x => x.Adder).FirstOrDefaultAsync(x => x.Id == id);
            if (result == null)
                return null;
                
            return result;
        }

        public async Task<Note?> GetNoteByIdAsync(int id)
        {
            var result = await _context.Notes.Include(x=>x.Adder).FirstOrDefaultAsync(x => x.Id == id);
            if (result == null)
                return null;

            return result;
        }
    }
}