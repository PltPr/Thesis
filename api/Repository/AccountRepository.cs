using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.AccountDto;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<AppUser>_userManager;
        public AccountRepository(ApplicationDBContext context,UserManager<AppUser>userManager)
        {
            _context=context;
            _userManager=userManager;
        }
        public async Task<EditAccountDetailsDto?> EditAccountAsync(string userId,EditAccountDetailsDto dto)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user==null)
                return null;
            
            var desc = user.AboutMe;
            if(desc == dto.AboutMe)
                return dto;
            
            user.AboutMe=dto.AboutMe;
            await _userManager.UpdateAsync(user);

            return new EditAccountDetailsDto{AboutMe=dto.AboutMe};
            
                
        }

        public async Task<string?> GetUserAboutMeAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user==null)
                return null;
            
            return user.AboutMe;
        }
    }
}