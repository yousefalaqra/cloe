using BeHealth.Presentence.Entities.Organization;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    public class WorkplaceConfiguration
    {
        public WorkplaceConfiguration(EntityTypeBuilder<WorkPlaceEntity> typeBuilder)
        {
            typeBuilder.HasData(
                new WorkPlaceEntity
                {
                    ID = 1,
                    CreatedAt = DateTime.Now,
                    CreatedBy = "SYSTEM",
                    OrganizationId = 1,
                    Title = "Ramallah - Clinic",

                },
                new WorkPlaceEntity
                {
                    ID = 2,
                    CreatedAt = DateTime.Now,
                    CreatedBy = "SYSTEM",
                    OrganizationId = 1,
                    Title = "Biddya - Clinic",
                }
            );
        }
    }
}
