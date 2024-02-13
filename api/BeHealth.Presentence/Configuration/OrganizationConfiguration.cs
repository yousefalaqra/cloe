using BeHealth.Presentence.Entities.Organization;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    public class OrganizationConfiguration
    {
        public OrganizationConfiguration(EntityTypeBuilder<OrganizationEntity> typeBuilder)
        {
            typeBuilder.HasData(
                new OrganizationEntity 
                { 
                    CreatedAt = DateTime.Now,
                    CreatedBy = "SYSTEM",
                    Email = "test@bhealth.com",
                    ID = 1,
                    OrganizationId = "122323",
                    Title = "BeHealth" 
                }
                );
        }
    }
}
