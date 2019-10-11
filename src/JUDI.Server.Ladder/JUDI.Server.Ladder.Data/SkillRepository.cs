using System.Collections.Generic;
using System.Linq;
using JUDI.API.Ladder.Contract;

namespace JUDI.Server.Ladder.Data
{
	public class SkillRepository
	{
		private readonly LadderDbContext dbContext;

		public SkillRepository(LadderDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public IEnumerable<SkillDto> Get(string username)
		{
			return from skill in dbContext.Skills
				   from claim in dbContext.Claims
					   .Where(claim => claim.Skill.Id == skill.Id && claim.ClaimingUsername == username)
					   .DefaultIfEmpty()
				   from endorsement in dbContext.Endorsements
					   .Where(endorsement => endorsement.EndorsedClaim.Id == claim.Id)
					   .DefaultIfEmpty()
				   select new SkillDto
				   {
					   Id = skill.Id,
					   Summary = skill.Summary,
					   Level = (Level) skill.Level,
					   Claimed = claim != null,
					   Endorsed = endorsement != null
				   };
		}
	}
}
