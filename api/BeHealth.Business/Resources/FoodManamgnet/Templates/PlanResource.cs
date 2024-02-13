using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.FoodManamgnet.Templates
{
    public class PlanResource
    {
        public long ID { get; set; }
        public List<DayResource> Days { get; set; }

        public List<MealResource> Meals { get; set; }
    }
}
