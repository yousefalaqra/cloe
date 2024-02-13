using BeHealth.Presentence.Entities.Appointments;
using BeHealth.Presentence.Entities.Clients;
using BeHealth.Presentence.Entities.Organization;
using BeHealth.Presentence.Entities.Subscription;
using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeHealth.Presentence.Entities.Organization
{
    [Table("Clients")]
    public class ClientEntity : TrackableEntity
    {
        public string clientId { get; set; }

        [StringLength(300)]
        public string FullName { get; set; }

        public DateTime? BirthDate { get; set; }

        [StringLength(15)]
        public string PhoneNumber { get; set; }

        public GenderEnum? Gender { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public bool isActive { get; set; }

        public IList<ClientWorkplaceEntity> ClientWorkplaceEntities { get; set; }

        public IList<ClientTagsEntity> ClientTags { get; set; }
        public IList<ClientsDiseasesEntity> ClientsDiseases { get; set; }
        public IList<ClinetsMedicationsEntity> ClinetsMedications { get; set; }
        public IList<ClientObservationsEntity> ClientObservations { get; set; }
        public IList<ClientMeasurementEntity> ClientMeasurements { get; set; }
        public IList<ClientsSubscriptionsEntity> ClientsSubscriptions { get; set; }
        public IList<ClientPaymentEntity> ClientPayments { get; set; }
        public IList<ClientDueEntity> Dues { get; set; }
        public IList<AppointmentEntity> Appointments { get; set; }

        public TemplateEntity ClientTmplate { get; set; }

    }
}
