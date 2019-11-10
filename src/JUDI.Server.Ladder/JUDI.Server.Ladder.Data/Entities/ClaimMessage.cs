using System.ComponentModel.DataAnnotations.Schema;

namespace JUDI.Server.Ladder.Data.Entities
{
	public class ClaimMessage
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public int ClaimId { get; set; }

		public virtual Message Message { get; set; }
	}
}
