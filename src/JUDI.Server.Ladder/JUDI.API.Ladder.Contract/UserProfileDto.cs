using System.Collections.Generic;

namespace JUDI.API.Ladder.Contract
{
	public class UserProfileDto
	{
		public int ClaimCount { get; set; }
		public int EndorsementCount { get; set; }
		public IEnumerable<ClaimDto> Claims { get; set; }
	}
}
