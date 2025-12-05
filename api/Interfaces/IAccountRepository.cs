using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AccountDto;

namespace api.Interfaces
{
    public interface IAccountRepository
    {
        Task<EditAccountDetailsDto?> EditAccountAsync(string userId,EditAccountDetailsDto dto);
        Task<string>GetUserAboutMeAsync(string userId);
    }
}