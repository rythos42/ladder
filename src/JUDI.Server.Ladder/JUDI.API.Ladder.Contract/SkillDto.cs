namespace JUDI.API.Ladder.Contract
{
	public class SkillDto
	{
		public int Id { get; set; }
		public string Summary { get; set; }
		public int LevelId { get; set; }
		public bool Claimed { get; set; }
		public bool Endorsed { get; set; }
	}
}
