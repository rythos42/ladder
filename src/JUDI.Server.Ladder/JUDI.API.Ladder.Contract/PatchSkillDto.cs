namespace JUDI.API.Ladder.Contract
{
	public class PatchSkillDto
	{
		public int SkillId { get; set; }
		public string PatchedByUsername { get; set; }
		public Level Level { get; set; }
		public string Summary { get; set; }
	}
}
