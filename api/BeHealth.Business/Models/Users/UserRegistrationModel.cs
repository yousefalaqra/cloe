using BeHealth.Presentence.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace BeHealth.Business.Models.Users
{
    public class UserRegistrationModel
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Email adress is required")]
        public string EmailAddress { get; set; }

        public DateTime DateOfBirth { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        public UserTypesEnum UserType { get; set; }
    }
}
