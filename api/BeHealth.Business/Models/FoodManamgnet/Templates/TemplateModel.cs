using BeHealth.Business.Models.FoodManamgnet.Templates;
using BeHealth.Business.Resources.Settings;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models.DietPlan
{
    public class TemplateModel : TrackableModel
    {
        public string Name { get; set; }

        public List<PlanModel> Plans { get; set; }

        public long? ClientId { get; set; }

    }
}
