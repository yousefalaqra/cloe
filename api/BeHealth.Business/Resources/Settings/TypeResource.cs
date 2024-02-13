using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Resources.Settings
{
    public class TypeResource

    {
        public long ID { get; set; }

        public string Type { get; set; }

        public CategoriesEnum TypeCategory { get; set; }

    }
}
