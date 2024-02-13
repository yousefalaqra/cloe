using BeHealth.Presentence.Entities.FoodManamgnet.Templates;
using BeHealth.Presentence.Entities.Organization;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeHealth.Presentence.Entities
{
    [Table("Templates")]

    public class TemplateEntity : TrackableEntity
    {
        [StringLength(120)]
        public string Name { get; set; }

        public IList<PlanEntity> TemplatePlansEntities { get; set; }

        [ForeignKey("Client")]
        public long? ClientId { get; set; }
        public ClientEntity Client { get; set; }
    }
}
