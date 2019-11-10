using System;
using System.Collections.Generic;
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
		public virtual ICollection<ClaimMessage> Messages { get; set; } = new List<ClaimMessage>();

		// This denormalizes the data a bit, because a claim is endorsed if this is true and also if there exists and endorsement for it.
		// Unfortunately, the SQL required to get "all non-endorsed claims" was crazier than simply adding this flag.
		public bool Endorsed { get; set; }
	}
}
