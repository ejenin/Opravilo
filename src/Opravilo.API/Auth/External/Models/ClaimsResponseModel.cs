// <auto-generated>

using System.Collections.Generic;

namespace Opravilo.API.Auth.External.Models
{
    public class UserClaims
    {
        public int id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
    }

    public class ClaimsResponseModel
    {
        public List<UserClaims> response { get; set; }
    }
}