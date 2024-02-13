using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models.Clients
{
    public class ClientRegistrationModel
    {
        public string FirstName { get; set; }


        public string SecondName { get; set; }


        public string IDNumber { get; set; }


        public GenderEnum Gender { get; set; }


        public DateTime DateOfBirth { get; set; }

        public string ClientEmailAddress { get; set; }


        public CountriesKeysEnum CountrYKey { get; set; }


        public string PhoneNumber { get; set; }
    }
}
