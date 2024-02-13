using BeHealth.Presentence.Entities.Organization;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    class ClientWorkplaceConfiguration
    {
        public ClientWorkplaceConfiguration(EntityTypeBuilder<ClientWorkplaceEntity> entityTypeBuilder)
        {
            entityTypeBuilder
             .HasKey(e => new { e.ClientId, e.WorkplaceId });

            entityTypeBuilder.HasOne(e => e.WorkPlaceEntity)
                .WithMany(l => l.ClientWorkplaceEntities)
                .HasForeignKey(e => e.WorkplaceId);

            entityTypeBuilder.HasOne(e => e.ClientEntity)
                .WithMany(c => c.ClientWorkplaceEntities)
                .HasForeignKey(e => e.ClientId);
        }
    }
}
