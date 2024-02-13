using BeHealth.Presentence.Entities.Clients;
using BeHealth.Presentence.Entities.Organization;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    public class ClientConfiguration
    {
        public ClientConfiguration(EntityTypeBuilder<ClientEntity> typeBuilder)
        {
            typeBuilder
                .HasIndex(p => new { p.PhoneNumber })
                .IsUnique();

            typeBuilder
                .HasIndex(p => new { p.clientId })
                .IsUnique();
        }
    }
}
