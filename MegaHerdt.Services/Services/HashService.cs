using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MegaHerdt.Services.Services
{
    public class HashService
    {
        public string Hash(string planeText)
        {
            var lengthSalt = 16;
            var salt = new byte[16];
            for(int i=0; i < lengthSalt; i++)
            {
                salt[i] = (byte)(i);
            }

            return Hash(planeText, salt);
        }

        public string Hash(string planeText, byte[] sal)
        {
            var derivatedKey = KeyDerivation.Pbkdf2(password: planeText,
                salt: sal, prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 32);

            var hash = Convert.ToBase64String(derivatedKey);

            return hash;
        }
    }
}
