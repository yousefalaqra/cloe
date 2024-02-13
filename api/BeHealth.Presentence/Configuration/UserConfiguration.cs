using BeHealth.Presentence.Entities;
using BeHealth.Presentence.Entities.Organization;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    public class UserConfiguration
    {
        public UserConfiguration(EntityTypeBuilder<UserEntity> typeBuilder)
        {
            typeBuilder.HasData(
                new UserEntity
                {
                    BirthDate = new DateTime(1993, 12, 31),
                    EmailAddress = "ameerah@gmail.com",
                    CreatedAt = DateTime.Now,
                    CreatedBy = "SYSTEM",
                    FullName = "Ameerah Karakrah",
                    ID = 1,
                    PhoneNumber = "+970595675811",
                    UserId = "12222345",

                }
                );
        }
    }
}
