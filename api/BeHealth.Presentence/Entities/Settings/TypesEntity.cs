using BeHealth.Presentence.Enums;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BeHealth.Presentence.Entities.Settings
{
    [Table("Types")]
    public class TypesEntity : BaseEntity
    {
        [MaxLength(16)]
        public string Type { get; set; }

        public CategoriesEnum TypeCategory { get; set; }
    }
}
