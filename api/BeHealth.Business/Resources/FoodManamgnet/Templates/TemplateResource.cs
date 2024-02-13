using BeHealth.Business.Resources.FoodManamgnet.Templates;
using BeHealth.Business.Resources.Settings;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.DietPlan
{
    public class TemplateResource : TrackableResource
    {
        public long ID { get; set; }

        public string Name { get; set; }

        public double Fat { get; set; }

        public double Energy { get; set; }

        public double Protien { get; set; }

        public double Carbs { get; set; }

        public List<PlanResource> Plans { get; set; }

    }
}
