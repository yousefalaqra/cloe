using BeHealth.Presentence.Entities.Organization;
using BeHealth.Presentence.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    public class UserWorkplaceConfiguration
    {
        public UserWorkplaceConfiguration(EntityTypeBuilder<UserWorkplaceEntity> typeBuilder)
        {
            typeBuilder
                .HasKey(e => new { e.UserId, e.WorkplaceId });

            typeBuilder.HasOne(e => e.WorkPlaceEntity)
                .WithMany(l => l.UserWorkplaceEntities)
                .HasForeignKey(e => e.WorkplaceId);

            typeBuilder.HasOne(e => e.UserEntity)
                .WithMany(c => c.UserWorkplaceEntities)
                .HasForeignKey(e => e.UserId);

            typeBuilder.HasData(
                new UserWorkplaceEntity
                {
                    UserId = 1,
                    WorkplaceId = 1,
                    Role = UserRole.Owner
                },
                new UserWorkplaceEntity
                {
                    UserId = 1,
                    WorkplaceId = 2,
                    Role = UserRole.Owner
                }
                );
        }
    }
}
