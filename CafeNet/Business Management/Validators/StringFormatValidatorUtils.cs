﻿using System.Text.RegularExpressions;

namespace CafeNet.Business_Management.Validators
{
    public static class StringFormatValidatorUtils
    {
        public static bool IsValidName(this string str)
        {
            if (str == null || str.Length == 0 || str.Length > 150)
                return false;
            Regex validateNameRegex = new Regex("^[a-zA-Z][a-zA-Z ]*$");
            if (validateNameRegex.IsMatch(str))
                return true;
            return false;
        }

        public static bool IsValidUsername(this string str)
        {
            if (str == null || str.Length < 8 || str.Length > 30)
                return false;
            Regex validateUsernameRegex = new Regex("^[a-zA-Z0-9][a-zA-Z0-9\\S]*$");
            if (validateUsernameRegex.IsMatch(str))
                return true;
            return false;
        }

        public static bool IsValidPassword(this string str)
        {
            if (str == null || str.Length < 8 || str.Length > 100)
                return false;
            Regex validatePasswordRegex = new Regex("^[a-zA-Z0-9](?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9\\W]*$");
            if (validatePasswordRegex.IsMatch(str))
                return true;
            return false;
        }
        public static bool IsValidPhone(this string str)
        {
            if (str == null || str.Length == 0 || str.Length > 40)
                return false;
            Regex validatePhoneRegex = new Regex(@"^(\+?[0-9 -]+)$");
            if (validatePhoneRegex.IsMatch(str))
                return true;
            return false;
        }
    }
}
