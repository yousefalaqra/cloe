using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BeHealth.Presentence.Entities.Organization
{
    public class UserEntity : TrackableEntity
    {
        public string UserId { get; set; }

        [StringLength(300)]
        public string FullName { get; set; }

        [StringLength(400)]
        public string EmailAddress { get; set; }

        public DateTime BirthDate { get; set; }

        [StringLength(15)]
        public string PhoneNumber { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public IList<UserWorkplaceEntity> UserWorkplaceEntities { get; set; }

    }
}
