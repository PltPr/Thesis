using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AccountDto
{
    public class RemoveRoleDto
    {
        public string UserId { get; set; }
        public string Role { get; set; }
    }
}