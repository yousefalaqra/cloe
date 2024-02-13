using BeHealth.Presentence.Entities.Settings;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeHealth.Presentence.Entities.Items
{
    [Table("ItemsTypes")]
    public class FoodItemsTypesEntity
    {
        [ForeignKey("Item")]
        public long ItemId { get; set; }
        public FoodItemEntity Item { get; set; }


        [ForeignKey("Type")]
        public long TypeId { get; set; }
        public TypesEntity Type{ get; set; }
    }
}
