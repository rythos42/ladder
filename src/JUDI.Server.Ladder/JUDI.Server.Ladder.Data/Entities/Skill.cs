using System;
using System.ComponentModel.DataAnnotations.Schema;
using JUDI.API.Ladder.Contract;

namespace JUDI.Server.Ladder.Data.Entities
{
	public class Skill
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string Summary { get; set; }
		public Level Level { get; set; }
		public string AddedByUsername { get; set; }
		public DateTime AddedOn { get; set; }
	}
}
