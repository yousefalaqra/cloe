using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Subscirption
{
    public class SubscriptionResource
    {
        public long ID { get; set; }
        public int Period { get; set; }

        public double Cost { get; set; }

        public bool Disabled { get; set; }
    }
}
