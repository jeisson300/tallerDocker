using dockerNet.Model;

namespace dockerNet.Repository.IRepository
{
    public interface IUser
    {

        string GenerarToken(User user);
    }
}
