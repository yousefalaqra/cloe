using BeHealth.Business.Models.DietPlan;
using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models.Clients
{
    public class ClientModel : TrackableModel
    {
        public string FullName { get; set; }

        public DateTime? BirthDate { get; set; }

        public string PhoneNumber { get; set; }

        public GenderEnum? Gender { get; set; }

        public IList<long> workPlacesIds { get; set; }

        public TemplateModel Template { get; set; }
    }
}
