using BeHealth.Presentence.Entities.Settings;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeHealth.Presentence.Entities.Meals
{
    [Table("MealsCategories")]
    public class RecipeCategoriesEntity : BaseEntity
    {
        [ForeignKey("Recipe")]
        public long RecipeId { get; set; }
        public RecipeEntity Recipe { get; set; }
        public string Category { get; set; }
    }
}
