using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.TestDto;
using api.Models;

namespace api.Interfaces
{
    public interface ITestRepository
    {
        Task<Test> AddTestAsync(AddTestDto dto);
        Task<Test> GetByIdAsync(int id);
    }
}