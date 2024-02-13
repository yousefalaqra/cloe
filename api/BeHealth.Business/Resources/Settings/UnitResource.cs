using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Settings
{
    public class UnitResource
    {
        public long ID { get; set; }

        public string Code { get; set; }

        public double GramsRatio { get; set; }

        public bool IsLiquid { get; set; }

    }
}
