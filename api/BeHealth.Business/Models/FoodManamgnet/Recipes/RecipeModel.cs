using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models.FoodManamgnet.Meals
{
    public class RecipeModel : TrackableModel
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTimeOffset? PreparationTime { get; set; }

    }
}
