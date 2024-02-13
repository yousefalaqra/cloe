using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models.FoodManamgnet.Templates
{
    public class PlanModel
    {
        public List<DayType> Days { get; set; }

        public List<MealsModel> Meals { get; set; }
    }
}
