using BeHealth.Presentence.Entities.Meals;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Presentence.Configuration
{
    class RecipeIngredientsConfiguration
    {
        public RecipeIngredientsConfiguration(EntityTypeBuilder<RecipeIngredientEntity> entityTypeBuilder)
        {
            entityTypeBuilder
                .HasKey(e => new { e.RecipeId, e.FoodItemId });

            entityTypeBuilder.HasOne(e => e.FoodItemEntity)
                .WithMany(l => l.MealItems)
                .HasForeignKey(e => e.FoodItemId);

            entityTypeBuilder.HasOne(e => e.RecipeEntity)
                .WithMany(c => c.Ingredients)
                .HasForeignKey(e => e.RecipeId);
        }
    }
}
