using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace JUDI.Server.Ladder.Data.Entities
{
	public class Endorsement
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string EndorserUsername { get; set; }
		public Claim EndorsedClaim { get; set; }
		public string EndorsementEvidence { get; set; }
		public DateTime EndorsementDate { get; set; }
	}
}
