using dockerNet.Model;
using dockerNet.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;

namespace dockerNet.Controllers
{
    public class DockerController : ControllerBase
    {

        private readonly IUser _user;
        public DockerController(IUser user)
        {
            _user = user;
        }

        [HttpGet("{nombreUsuario}")]
        public string punto2(string nombreUsuario)
        {
            Console.WriteLine(nombreUsuario);
            return $"Hola {nombreUsuario}";
        }

        [HttpPost("generarToken")]
        public string punto4(User user)
        {
            string token = _user.GenerarToken(user);
            return token;
        }
    }
}
