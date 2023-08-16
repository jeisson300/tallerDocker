using dockerNet.Model;
using dockerNet.Repository.IRepository;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace dockerNet.Repository
{
    public class UserRepository : IUser
    {
        private readonly IConfiguration _configuration;
        public UserRepository(IConfiguration configuration)
        {

            _configuration = configuration; 

        }
        public string GenerarToken(User user)
        {
            string secretKey = _configuration.GetValue<string>("enviaronment:secretKey");
            var tokenHanlder = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.name),
                    new Claim(ClaimTypes.Email, user.name),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHanlder.CreateToken(tokenDescriptor);

            return tokenHanlder.WriteToken(token);
        }
    }
}
