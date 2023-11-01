namespace ApiGateway.DTO
{
    public class ActualizarPerfilDTO
    {
        public int id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string nickname { get; set; }
        public int public_info { get; set; }
        public string postal_address { get; set; }
        public string biography { get; set; }
        public string company { get; set; }
        public string country { get; set; }
        public string links { get; set; }
    }
}
