using BeHealth.Presentence.Entities.Organization;
using BeHealth.Presentence.Entities.Settings;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BeHealth.Presentence.Entities.Clients
{
    public class ClinetsMedicationsEntity : BaseEntity
    {

        [Column("Client_ID")]
        [ForeignKey("ClientEntity")]
        public long ClientID { get; set; }
        public ClientEntity ClientEntity { get; set; }

        [Column("Medication_Name")]
        [StringLength(20)]
        public string MedicationName { get; set; }
    }
}
