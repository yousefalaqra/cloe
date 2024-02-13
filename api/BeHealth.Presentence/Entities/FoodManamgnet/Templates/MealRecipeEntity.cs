using BeHealth.Presentence.Entities.Meals;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.FoodManamgnet.Templates
{
    public class MealRecipeEntity : BaseEntity
    {

        [ForeignKey("MealEntity")]
        public long MealId { get; set; }

        public MealEntity MealEntity { get; set; }


        [ForeignKey("RecipeEntit")]
        public long RecipeId { get; set; }
        public RecipeEntity RecipeEntity { get; set; }

        public string Name { get; set; }
    }
}
