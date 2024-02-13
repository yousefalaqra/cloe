using BeHealth.Presentence.Entities.Items;
using BeHealth.Presentence.Entities.Settings;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeHealth.Presentence.Entities.FoodManamgnet.Nutrition
{
    public class NutritionValueEntity : BaseEntity
    {
        public double Fat { get; set; }

        public double Carbohydrates { get; set; }

        public double Protein { get; set; }

        public double Calories { get; set; }

        public double BaseQuantity { get; set; }

        [ForeignKey("UnitId ")]
        public UnitEntity UnitEntity { get; set; }
        public long UnitId { get; set; }

        [ForeignKey("FoodItemId")]
        public FoodItemEntity FoodItemEntity { get; set; }
        public long FoodItemId { get; set; }
    }
}
