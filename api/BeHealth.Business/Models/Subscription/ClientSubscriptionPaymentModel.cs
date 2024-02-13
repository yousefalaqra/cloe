using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models.Subscription
{
    public class ClientSubscriptionPaymentModel
    {
        public double Amount { get; set; }
        public CurrencyTypes Currency { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}
