using System;
using System.Collections.Generic;

namespace JUDI.API.Ladder.Contract
{
	public class ClaimDto
	{
		public int Id { get; set; }
		public string FromUsername { get; set; }
		public int LevelId { get; set; }
		public string SkillSummary { get; set; }
		public string ClaimEvidence { get; set; }
		public IEnumerable<ClaimMessageDto> Messages { get; set; }
		public DateTime ClaimDate { get; set; }
		public bool Endorsed { get; set; }
		public IEnumerable<string> RequestedEndorserUsernames { get; set; }
	}
}
