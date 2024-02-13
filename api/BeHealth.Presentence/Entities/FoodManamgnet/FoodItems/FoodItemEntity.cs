using BeHealth.Presentence.Entities.Clients;
using BeHealth.Presentence.Entities.FoodManamgnet.Nutrition;
using BeHealth.Presentence.Entities.FoodManamgnet.Templates;
using BeHealth.Presentence.Entities.Meals;
using BeHealth.Presentence.Entities.Settings;
using BeHealth.Presentence.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeHealth.Presentence.Entities.Items
{
    [Table("Items")]
    public class FoodItemEntity : TrackableEntity
    {
        [StringLength(15)]
        public string Name { get; set; }

        public double Fat { get; set; }

        public double Carbohydrates { get; set; }

        public double Protein { get; set; }

        public double Calories { get; set; }

        public double BaseQuantity { get; set; }

        [ForeignKey("UnitEntity")]
        public long UnitId { get; set; }
        public UnitEntity UnitEntity { get; set; }


        public int Group { get; set; }

        public IList<RecipeIngredientEntity> MealItems { get; set; }
        public IList<MealItemEntity> MealFoodItems { get; set; }


    }
}
