using System.ComponentModel.DataAnnotations.Schema;

namespace JUDI.Server.Ladder.Data.Entities
{
	public class ClaimMessage
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		public Message Message { get; set; }
	}
}
