using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Users
{
    public class UserResource
    {
        public long ID { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Username { get; set; }

        public string EmailAddress { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string PhoneNumber { get; set; }

        public string Password { get; set; }

        public UserTypesEnum UserType { get; set; }
    }
}
