using BeHealth.Business.Resources;
using BeHealth.Business.Resources.Users;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BeHealth.API.Configuration.JwtToken
{
    public interface IJwtTokenFactory
    {
        public string GenerateJWTToken(UserResource userInfo);
    }
    public class JwtTokenFactory : IJwtTokenFactory
    {
        private readonly IConfiguration _configuration;

        public JwtTokenFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string GenerateJWTToken(UserResource userInfo)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userInfo.Username),
                new Claim(ClaimTypes.NameIdentifier, userInfo.ID.ToString()),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString())
            };

            //_configuration["Issuer"],
            //    _configuration["Audience"],
            //    claims,
            //    signingCredentials: creds

            JwtSecurityToken token = new JwtSecurityToken(
                new JwtHeader(
                    new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtKey"])), SecurityAlgorithms.HmacSha256)
                    ),
                new JwtPayload(claims)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
