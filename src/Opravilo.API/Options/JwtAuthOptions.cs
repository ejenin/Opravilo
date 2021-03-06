using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Opravilo.API.Options
{
    public class JwtAuthOptions
    {
        public const string OptionName = "Auth";
        public string Key { get; set; }
        public int Lifetime { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public int RefreshLifetime { get; set; }

        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}