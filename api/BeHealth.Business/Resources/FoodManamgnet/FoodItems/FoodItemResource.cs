using BeHealth.Business.Resources.Settings;

namespace BeHealth.Business.Resources.FoodManamgnet.FoodItems
{
    public class FoodItemResource
    {
        public long ID { get; set; }

        public string Name { get; set; }

        public double Fat { get; set; }

        public double Carbohydrates { get; set; }

        public double Protein { get; set; }

        public double Calories { get; set; }

        public double BaseQuantity { get; set; }

        public int Group { get; set; }

        public UnitResource Unit { get; set; }

    }
}
