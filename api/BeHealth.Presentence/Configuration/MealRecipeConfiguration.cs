using BeHealth.Presentence.Entities.FoodManamgnet.Templates;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    public class MealRecipeConfiguration
    {
        public MealRecipeConfiguration(EntityTypeBuilder<MealRecipeEntity> entityTypeBuilder)
        {
            entityTypeBuilder
              .HasKey(e => new { e.RecipeId, e.MealId });

            entityTypeBuilder.HasOne(e => e.MealEntity)
                .WithMany(l => l.Recipes)
                .HasForeignKey(e => e.MealId);

            entityTypeBuilder.HasOne(e => e.RecipeEntity)
                .WithMany(c => c.Meals)
                .HasForeignKey(e => e.RecipeId);
        }
    }
}
