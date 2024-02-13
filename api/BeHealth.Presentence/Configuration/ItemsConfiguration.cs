using BeHealth.Presentence.Entities.Items;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    public class ItemsConfiguration
    {
        public ItemsConfiguration(EntityTypeBuilder<FoodItemEntity> itemEntityTypeBuilder)
        {
            itemEntityTypeBuilder
                .HasIndex(item => new { item.Name })
                .IsUnique();

        }
    }
}
