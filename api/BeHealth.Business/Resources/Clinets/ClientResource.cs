using BeHealth.Business.Resources.Appointment;
using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Clinets
{
    public class ClientResource : TrackableResource
    {
        public string ClientId { get; set; }

        public string FullName { get; set; }

        public DateTime? BirthDate { get; set; }

        public GenderEnum? Gender { get; set; }

        public string PhoneNumber { get; set; }

        public bool IsActive { get; set; }

        public List<long> WorkPLacesIds { get; set; }
        public List<TagResource> ClientTags { get; set; }
        public List<ClientDiseaseResource> ClientDiseases { get; set; }
        public List<ClientMedicationResource> ClientMedications { get; set; }
        public List<ClientObservationResource> ClientObservations { get; set; }
        public List<clientMeasurementResource> clientMeasurements { get; set; }
        public List<ClientSubscriptionsResource> ClientSubscriptions { get; set; }
        public List<ClientDueResource> Dues { get; set; }
        public List<ClientPaymentResource> Payments { get; set; }
        public List<AppointmentResource> Appointments { get; set; }

        public long? TemplateId { get; set; }

        public bool InDebt { get; set; }

    }
}
