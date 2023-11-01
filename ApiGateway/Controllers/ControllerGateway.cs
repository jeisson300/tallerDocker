using ApiGateway.DTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;

namespace ApiGateway.Controllers
{
    [ApiController]
    [Route("/")]
    public class ControllerGateway: ControllerBase
    {

        [HttpPost("loggearUsuario")]
        public IActionResult loggearUsuario([FromBody] LoginDTO loginDTO)
        {
            var client = new RestClient();
            var request = new RestRequest("http://api:3000/users/login", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            var body = new
            {
                email = loginDTO.email,
                password = loginDTO.password,

            };

            request.AddBody(body);

            var restResponse = client.Execute(request);
            JObject jsonResponse = JObject.Parse(restResponse.Content);

            if (jsonResponse["data"] == null)
            {
                string error = (string)jsonResponse["error"];
                return Ok(new { error });
            }

            string authToken = (string)jsonResponse["data"]["token"];
            return Ok(new { authToken });
        }

        [HttpPost("crearUsuario")]
        public IActionResult crearUsuario([FromBody] AuthUserDTO authUsuarioDTO)
        {
            var client = new RestClient();

            var request1 = new RestRequest("http://api:3000/users", Method.Post);
            var request2 = new RestRequest("http://apiprofile/profile", Method.Post);

            request1.AddHeader("Content-Type", "application/json");
            request2.AddHeader("Content-Type", "application/json");

            var body1 = new
            {
                first_name = authUsuarioDTO.first_name,
                last_name = authUsuarioDTO.last_name,
                email = authUsuarioDTO.email,
                password = authUsuarioDTO.password,
                id_role = authUsuarioDTO.id_role,
                status = authUsuarioDTO.status,
            };

            var body2 = new
            {
                id = authUsuarioDTO.id_role,
                first_name = authUsuarioDTO.first_name,
                last_name = authUsuarioDTO.last_name
            };

            request1.AddBody(body1);
            request2.AddBody(body2);

            var restResponse1 = client.Execute(request1);
            var restResponse2 = client.Execute(request2);

            JObject jsonResponse1 = JObject.Parse(restResponse1.Content);
            JObject jsonResponse2 = JObject.Parse(restResponse2.Content);

            string ResAPIAuth = (string)jsonResponse1["httpStatus"];
            string ResAPIPerfil = (string)jsonResponse2["success"];

            return Ok(new { ResAPIAuth, ResAPIPerfil });
        }

        [HttpGet("obtenerUsuarios")]
        public IActionResult obtenerUsuarios()
        {
            var client = new RestClient();
            var request = new RestRequest("http://api:3000/users", Method.Get);

            var restResponse = client.Execute(request);

            return Ok(new { restResponse.Content });
        }

        [HttpGet("obtenerUsuario")]
        public IActionResult obtenerUsuario(int id, [FromHeader] string authToken)
        {
            var client = new RestClient();
            var request = new RestRequest("http://api:3000/users/" + id, Method.Get);
            request.AddHeader("auth-token", authToken);

            var restResponse = client.Execute(request);
            
            return Ok(new { restResponse.Content });
        }

        [HttpPut("actualizarUsuario")]
        public IActionResult actualizarUsuario(int id, [FromHeader] string authToken, [FromBody] AuthUserDTO authUserDTO)
        {
            var client = new RestClient();
            var request = new RestRequest("http://api:3000/users/" + id, Method.Put);
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("auth-token", authToken);

            var body = new
            {
                first_name = authUserDTO.first_name,
                last_name = authUserDTO.last_name,
                email = authUserDTO.email,
                password = authUserDTO.password,
                id_role = authUserDTO.id_role,
                status = authUserDTO.status,
            };

            request.AddBody(body);

            var restResponse = client.Execute(request);
            JObject jsonResponse = JObject.Parse(restResponse.Content);
            string ResAPIAuth = (string)jsonResponse["httpStatus"];
            return Ok(new { ResAPIAuth });
        }

        [HttpDelete("eliminarUsuario")]
        public IActionResult eliminarUsuario(int id, [FromHeader] string authToken)
        {
            var client = new RestClient();
            var request = new RestRequest("http://api:3000/users/" + id, Method.Delete);
            request.AddHeader("auth-token", authToken);
            var restResponse = client.Execute(request);
            JObject jsonResponse = JObject.Parse(restResponse.Content);
            string ResAPIAuth = (string)jsonResponse["httpStatus"];
            return Ok(new { ResAPIAuth });
        }

        [HttpPut("actualizarPerfil")]
        public IActionResult actualizarPerfil([FromBody] ActualizarPerfilDTO actualizarPerfilDTO)
        {
            var client = new RestClient();
            var request = new RestRequest("http://apiprofile/profile", Method.Put);
            request.AddHeader("Content-Type", "application/json");
            var body = new
            {
                id = actualizarPerfilDTO.id,
                first_name = actualizarPerfilDTO.first_name,
                last_name = actualizarPerfilDTO.last_name,
                nickname = actualizarPerfilDTO.nickname,
                public_info = actualizarPerfilDTO.public_info,
                postal_address = actualizarPerfilDTO.postal_address,
                biography = actualizarPerfilDTO.biography,
                company = actualizarPerfilDTO.company,
                country = actualizarPerfilDTO.country,
                links = actualizarPerfilDTO.links
            };

            request.AddBody(body);

            var restResponse = client.Execute(request);
            JObject jsonResponse = JObject.Parse(restResponse.Content);
            string ResAPIPerfil = (string)jsonResponse["success"];
            return Ok(new { ResAPIPerfil });
        }

        [HttpGet("obtenerPerfil")]
        public IActionResult obtenerPerfil(int id)
        {
            var client = new RestClient();
            var request = new RestRequest("http://apiprofile/profile/" + id, Method.Get);

            var restResponse = client.Execute(request);

            return Ok(new { restResponse.Content });
        }
    }
}
