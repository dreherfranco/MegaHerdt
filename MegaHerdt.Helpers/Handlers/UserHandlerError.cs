using MegaHerdt.Models.Models.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Helpers.Handlers
{
    public static class UserHandlerError
    {
        public static List<string> SetRegisterError(User userToRegister, List<User> users)
        {
            var errorTranslateds = new List<string>();
            foreach(var user in users)
            {
                
                if (user.Email.Equals(userToRegister.Email))
                {
                    errorTranslateds.Add("Ya existe el Email que está intentando utilizar");
                    return errorTranslateds;
                }
                if (user.Dni.Equals(userToRegister.Dni))
                {
                    errorTranslateds.Add("Ya existe el DNI que está intentando utilizar");
                    return errorTranslateds;
                }
            }
            return errorTranslateds;
        }

        public static List<string> SetUpdateError(User userToUpdate, List<User> users)
        {
            var errorTranslateds = new List<string>();
            foreach (var user in users)
            {

                if (user.Email.Equals(userToUpdate.Email) && userToUpdate.Id != user.Id)
                {
                    errorTranslateds.Add("Ya existe el Email que está intentando utilizar");
                    return errorTranslateds;
                }
                if (user.Dni.Equals(userToUpdate.Dni) && userToUpdate.Id != user.Id)
                {
                    errorTranslateds.Add("Ya existe el DNI que está intentando utilizar");
                    return errorTranslateds;
                }
            }
            return errorTranslateds;
        }
    }
}
