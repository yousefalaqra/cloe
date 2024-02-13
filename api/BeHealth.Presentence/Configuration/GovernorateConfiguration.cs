using BeHealth.Presentence.Entities.Locations;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    class GovernorateConfiguration
    {
        public GovernorateConfiguration(EntityTypeBuilder<GovernorateEntity> entityTypeBuilder)
        {
            
            entityTypeBuilder.HasData(
                new GovernorateEntity
                {
                    ID = 1,
                    GovernorateNameAR = "سلفيت",
                    GovernorateNameEN = "Salfeet"
                }
                );
        }
    }
}
