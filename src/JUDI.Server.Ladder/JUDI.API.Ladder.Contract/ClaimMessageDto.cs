using System;

namespace JUDI.API.Ladder.Contract
{
	public class ClaimMessageDto
	{
		public string Text { get; set; }
		public string AuthorUsername { get; set; }
		public DateTime WrittenOnDate { get; set; }
	}
}
