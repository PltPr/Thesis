using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AccountDto;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Mappers
{
    public static class AccountMappers
    {
        public static AllUsersDto toAllUserDto (this AppUser appUser)
        {
            return new AllUsersDto
            {
                Id=appUser.Id,
                Name=appUser.Name,
                Surname=appUser.Surname,
                Email=appUser.Email,
                PhoneNumber=appUser.PhoneNumber
            };
        }

        public static async Task<AllUsersDto> toAllUserWithRolesDto(this AppUser appUser, UserManager<AppUser>userManager)
        {
            var dto = appUser.toAllUserDto();

            var roles = await userManager.GetRolesAsync(appUser);
            dto.Roles = roles.ToList();

            return dto;
        }
    }
}