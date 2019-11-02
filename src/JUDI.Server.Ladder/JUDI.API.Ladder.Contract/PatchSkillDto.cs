namespace JUDI.API.Ladder.Contract
{
	public class PatchSkillDto
	{
		public int SkillId { get; set; }
		public string PatchedByUsername { get; set; }
		public int LevelId { get; set; }
		public string Summary { get; set; }
	}
}
