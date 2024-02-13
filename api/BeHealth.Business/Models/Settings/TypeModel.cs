using BeHealth.Presentence.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeHealth.Business.Models.Settings
{
    public class TypeModel
    {
        public string Type { get; set; }

        public CategoriesEnum TypeCategory { get; set; }
    }
}
