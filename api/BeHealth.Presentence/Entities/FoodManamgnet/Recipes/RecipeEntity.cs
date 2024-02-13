using BeHealth.Presentence.Entities.FoodManamgnet.Recipes;
using BeHealth.Presentence.Entities.FoodManamgnet.Templates;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Meals
{
    [Table("Recipes")]
    public class RecipeEntity : TrackableEntity
    {
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        public DateTimeOffset? PreparationTime { get; set; }

        public IEnumerable<RecipeIngredientEntity> Ingredients { get; set; }

        public IList<RecipeCategoriesEntity> RecipeCategoires { get; set; }

        public IList<RecipeStepsEntity> Steps { get; set; }

        public IList<MealRecipeEntity> Meals { get; set; }

    }
}
