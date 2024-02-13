using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models.Clients
{
    public class ClientMeasurementModel
    {
        public double Height { get; set; }
        public DateTimeOffset Date { get; set; }
        public double Wight { get; set; }
        public double TotalBodyWater { get; set; }
        public double Protien { get; set; }
        public double Minerals { get; set; }
        public double BodyFatMass { get; set; }
        public double skeletalMuscleMass { get; set; }
        public double BodyMassIndex { get; set; }
        public double FatOfRightArm { get; set; }
        public double FatOfLeftArm { get; set; }
        public double FatOfTruck { get; set; }
        public double FatOfLeftLeg { get; set; }
        public double FatOfRightLeg { get; set; }
        public double CaloriesIntake { get; set; }
        public double WaistHipRatio { get; set; }

    }
}
