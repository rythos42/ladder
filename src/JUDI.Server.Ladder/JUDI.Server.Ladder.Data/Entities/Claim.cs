using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace JUDI.Server.Ladder.Data.Entities
{
	public class Claim
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public Skill Skill { get; set; }
		public string ClaimingUsername { get; set; }
		public DateTime ClaimDate { get; set; }
		public string ClaimEvidence { get; set; }
		public string TaggedEndorserEmails { get; set; }
	}
}
