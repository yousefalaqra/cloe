using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Organization
{
    public class UserWorkplaceEntity
    {
        [ForeignKey("WorkPlaceEntity")]
        public long WorkplaceId { get; set; }
        public WorkPlaceEntity WorkPlaceEntity { get; set; }

        [ForeignKey("UserEntity")]
        public long UserId { get; set; }
        public UserEntity UserEntity { get; set; }

        public UserRole Role { get; set; }
    }
}
