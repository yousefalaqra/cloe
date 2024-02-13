using BeHealth.Presentence.Entities.Subscription;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    public class ClientsSubscriptionsConfiguration
    {
        public ClientsSubscriptionsConfiguration(EntityTypeBuilder<ClientsSubscriptionsEntity> typeBuilder)
        {
            typeBuilder
               .HasIndex(e => new { e.ClientId, e.SubscriptionId }).IsUnique();

            typeBuilder.HasOne(e => e.SubscriptionEntity)
                .WithMany(l => l.ClientsSubscriptions)
                .HasForeignKey(e => e.SubscriptionId);

            typeBuilder.HasOne(e => e.ClientEntity)
                .WithMany(c => c.ClientsSubscriptions)
                .HasForeignKey(e => e.ClientId);
        }
    }
}

