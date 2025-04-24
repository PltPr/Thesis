using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AccountDto;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser>_userManager;
        private readonly ITokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService)
        {
            _userManager=userManager;
            _tokenService=tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterDto registerDto)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest();

                var appUser=new AppUser{
                    UserName=registerDto.Email,
                    Email=registerDto.Email,
                };


                var createdUser=await _userManager.CreateAsync(appUser,registerDto.Password);

                if(createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser,"User");
                    if(roleResult.Succeeded)
                    {
                        var roles = new List<string> {"User"};
                        return Ok(
                            new NewUserDto
                            {
                                Email=appUser.Email,
                                Token=_tokenService.CreateToken(appUser,roles)
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500,roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500,createdUser.Errors);
                }
            }
            catch(Exception e)
            {
                
                return StatusCode(500,e);
            }
        }
    }
}