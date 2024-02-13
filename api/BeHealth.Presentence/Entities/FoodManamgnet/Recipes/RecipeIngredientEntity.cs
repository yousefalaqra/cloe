using BeHealth.Presentence.Entities.Items;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeHealth.Presentence.Entities.Meals
{
    [Table("RecipeIngredients")]
    public class RecipeIngredientEntity : BaseEntity
    {

        [ForeignKey("FoodItemEntity")]
        public long FoodItemId { get; set; }
        public FoodItemEntity FoodItemEntity { get; set; }

        public double Quantity { get; set; }

        public long UnitId { get; set; }

        [ForeignKey("RecipeEntity")]
        public long RecipeId { get; set; }
        public RecipeEntity RecipeEntity { get; set; }

    }
}
