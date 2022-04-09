namespace MegaHerdt.API.Utils
{
    public static class PasswordGenerator
    {
        public static string GenerateRandomPassword()
        {
            Random rdn = new Random();
            string characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890%$#@";
            int length = characters.Length;
            char letter;
            int passwordLength = 10;
            string randomPassword = string.Empty;
            for (int i = 0; i < passwordLength; i++)
            {
                letter = characters[rdn.Next(length)];
                randomPassword += letter.ToString();
            }
            return randomPassword;
        }
    }
}
