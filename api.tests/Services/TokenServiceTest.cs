using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Models;
using api.Services;
using Microsoft.Extensions.Configuration;

namespace api.tests.Services
{
    public class TokenServiceTest
    {
        private TokenService CreateTokenService()
        {
            var inMemoryConfiguration = new Dictionary<string, string>
            {
            {"JWT:SigningKey", "this_is_a_very_long_signing_key_for_jwt_token_generation_and_must_be_64_chars_long!"},
            {"JWT:Issuer", "TestIssuer"},
            {"JWT:Audience", "TestAudience"}
            };

            IConfiguration configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemoryConfiguration)
            .Build();

            return new TokenService(configuration);
        }
    

        [Fact]
        public void TokenService_CreateToken_ShouldReturnValidToken()
        {
            var tokenService = CreateTokenService();

            var appUser = new AppUser
            {
                Id="testUserId",
                UserName="test@text.com",
                Email="test@text.com",
                PhoneNumber="123123123",
                Name="TestName",
                Surname="TestSurname"
            };
            var roles = new List<string>{"User"};

            var token = tokenService.CreateToken(appUser,roles);

            Assert.False(string.IsNullOrEmpty(token));

            var handler = new JwtSecurityTokenHandler();
            var tokenObject = handler.ReadJwtToken(token);
            
            foreach(var c in tokenObject.Claims)
{
    Console.WriteLine($"Claim type: {c.Type}, value: {c.Value}");
}

            var usernameClaim = tokenObject.Claims.FirstOrDefault(c=>c.Type==JwtRegisteredClaimNames.GivenName);
            Assert.NotNull(usernameClaim);

            var emailClaim=tokenObject.Claims.FirstOrDefault(c=>c.Type==JwtRegisteredClaimNames.Email);
            Assert.NotNull(emailClaim);

            Assert.Equal(usernameClaim.Value+emailClaim.Value,appUser.UserName+appUser.Email);

            var idClaim = tokenObject.Claims.FirstOrDefault(c=>c.Type==JwtRegisteredClaimNames.NameId);
            Assert.NotNull(idClaim);
            Assert.Equal(idClaim.Value,appUser.Id);

            var claimRoles = tokenObject.Claims.Where(c=>c.Type=="role").Select(c=>c.Value).ToList();
            Assert.Contains("User",claimRoles);
            Assert.DoesNotContain("Admin",claimRoles);

        }
    }
}