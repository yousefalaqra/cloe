using BeHealth.Presentence.Entities.Meals;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.FoodManamgnet.Recipes
{
    public class RecipeStepsEntity : BaseEntity
    {
        public string description { get; set; }

        [ForeignKey("Recipe")]
        public long RecipeId { get; set; }
        public RecipeEntity Recipe { get; set; }

    }
}
