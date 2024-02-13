using BeHealth.Presentence.Entities.Settings;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    public class UnitsConfiguration
    {
        public UnitsConfiguration(EntityTypeBuilder<UnitEntity> unitEntityTypeBuilder)
        {
            unitEntityTypeBuilder
                .HasIndex(unit => new { unit.Code })
                .IsUnique();



            unitEntityTypeBuilder.HasData(
                new UnitEntity { ID = 1, Code = "جرام", GramsRatio = 1.0, IsLiquid = false },
                new UnitEntity { ID = 2, Code = "مللتر", GramsRatio = 1.0, IsLiquid = true },
                new UnitEntity { ID = 3, Code = "كوب", GramsRatio = 250.0, IsLiquid = true },
                new UnitEntity { ID = 4, Code = "ملعقة", GramsRatio = 15.0, IsLiquid = false },
                new UnitEntity { ID = 5, Code = "اوز", GramsRatio = 30.0, IsLiquid = false },
                new UnitEntity { ID = 6, Code = "قطعة", GramsRatio = 1.0, IsLiquid = false }
                );
        }
    }
}
