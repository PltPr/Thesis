using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Dtos.AccountDto;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly IAccountRepository _accRepo;
        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, IEmailSender emailSender, IAccountRepository accRepo)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _accRepo = accRepo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest();

                var existingUser = await _userManager.FindByEmailAsync(registerDto.Email);
                if (existingUser != null) return BadRequest(new { message = "Email is already taken" });

                var appUser = new AppUser
                {
                    UserName = registerDto.Email,
                    Email = registerDto.Email,
                    PhoneNumber = registerDto.PhoneNumber,
                    Name = registerDto.Name,
                    Surname = registerDto.Surname

                };


                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");
                    if (roleResult.Succeeded)
                    {
                        var roles = new List<string> { "User" };

                        var token = _tokenService.CreateToken(appUser, roles);
                        Response.Cookies.Append("jwt", token, new CookieOptions
                        {
                            HttpOnly = true,
                            Secure = false,
                            SameSite = SameSiteMode.Lax,
                            Expires = DateTime.UtcNow.AddDays(7)
                        });

                        return Ok(
                            new NewUserDto
                            {
                                Name = appUser.Name,
                                Surname = appUser.Surname,
                                PhoneNumber = appUser.PhoneNumber,
                                Email = appUser.Email,
                                Roles = roles.ToArray()
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {

                return StatusCode(500, e);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email.ToLower());
            if (user == null) return Unauthorized(new { message = "Email not found and/or password is incorrect" });

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded) return Unauthorized(new { message = "Email not found and/or password is incorrect" });


            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenService.CreateToken(user, roles);
            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Ok(
                new NewUserDto
                {
                    Name = user.Name,
                    Surname = user.Surname,
                    PhoneNumber = user.PhoneNumber,
                    Email = user.Email,
                    Roles = roles.ToArray()
                }
            );
        }
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return Ok();

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

            var url = "http://localhost:3000/forgot-password";
            var resetLink = $"{url}?email={model.Email}&token={encodedToken}";

            await _emailSender.SendEmailAsync(model.Email, "Password reset", $"Kliknij link, aby zresetować hasło: <a href=\"{resetLink}\">Resetuj hasło</a>");

            return Ok(token);
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequestDto model)
        {
            if (!ModelState.IsValid) return BadRequest();

            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null) return BadRequest();

            var decodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Token));

            var result = await _userManager.ResetPasswordAsync(user, decodedToken, model.NewPassword);
            if (result.Succeeded) return Ok();
            else return BadRequest();
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "Logged out successfully" });
        }

        [HttpPut("AccountEdit")]
        public async Task<IActionResult> AccountEdit([FromBody] EditAccountDetailsDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var result = await _accRepo.EditAccountAsync(userId, dto);
            if (result == null)
                return Unauthorized();

            return Ok(result);
        }
        [HttpGet("GetUserAboutMe")]
        public async Task<IActionResult> GetUserAboutMe()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
                return Unauthorized();

            var result = await _accRepo.GetUserAboutMeAsync(userId);
            if (result == null)
                return NotFound();

            return Ok(result);
        }
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var result = new List<AllUsersDto>();

            foreach (var user in users)
            {
                var dto = await user.toAllUserWithRolesDto(_userManager);
                result.Add(dto);
            }

            return Ok(result);
        }

        [HttpPost("AddRole")]
        public async Task<IActionResult> AddRole([FromBody] AddRoleDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            var user = await _userManager.FindByIdAsync(dto.UserId);
            if (user == null)
                return NotFound();

            if (dto.Role != "Admin" && dto.Role != "Examiner")
                return BadRequest($"Role {dto.Role} not exist");

            if (await _userManager.IsInRoleAsync(user, dto.Role))
                return BadRequest(new { message = $"User already has role '{dto.Role}'" });

            var result = await _userManager.AddToRoleAsync(user, dto.Role);

            return Ok(new { message = "Role added" });
        }
        [HttpPost("DeleteRole")]
        public async Task<IActionResult> DeleteRole([FromBody] RemoveRoleDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var user = await _userManager.FindByIdAsync(dto.UserId);
            if (user == null)
                return NotFound();

            if (dto.Role != "Admin" && dto.Role != "Examiner")
                return BadRequest($"Role {dto.Role} not exist");

            if (!await _userManager.IsInRoleAsync(user, dto.Role))
                return BadRequest(new { message = $"User already has not role '{dto.Role}'" });

            var result = await _userManager.RemoveFromRoleAsync(user, dto.Role);

            return Ok(new { message = "Role deleted" });
        }

    }

}