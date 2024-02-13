using BeHealth.Presentence.Entities.FoodManamgnet.Templates;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    public class MealItemConfiguration
    {

        public MealItemConfiguration(EntityTypeBuilder<MealItemEntity> entityTypeBuilder)
        {
            entityTypeBuilder
              .HasKey(e => new { e.ItemId, e.MealId });

            entityTypeBuilder.HasOne(e => e.MealEntity)
                .WithMany(l => l.Items)
                .HasForeignKey(e => e.MealId);

            entityTypeBuilder.HasOne(e => e.FoodItem)
                .WithMany(c => c.MealFoodItems)
                .HasForeignKey(e => e.ItemId);
        }
    }
}
