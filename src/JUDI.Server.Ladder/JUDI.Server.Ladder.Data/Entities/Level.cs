using System.ComponentModel.DataAnnotations.Schema;

namespace JUDI.Server.Ladder.Data.Entities
{
	public class Level
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string Name { get; set; }
	}
}
