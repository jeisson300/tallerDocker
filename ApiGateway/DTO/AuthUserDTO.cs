namespace ApiGateway.DTO
{
    public class AuthUserDTO
    {
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public int id_role { get; set; }
        public string status { get; set; }
    }
}
