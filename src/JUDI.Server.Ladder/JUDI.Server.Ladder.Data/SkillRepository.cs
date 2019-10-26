using System;
using System.Collections.Generic;
using System.Linq;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data.Entities;

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
					   Level = skill.Level,
					   Claimed = claim != null,
					   Endorsed = endorsement != null
				   };
		}

		public void Add(string addedByUsername, Level level, string summary)
		{
			dbContext.Skills.Add(new Skill
			{
				AddedByUsername = addedByUsername,
				Level = level,
				Summary = summary,
				AddedOn = DateTime.Now
			});
			dbContext.SaveChanges();
		}

		public void Update(string updatedByUsername, int skillId, Level level, string summary)
		{
			Skill skillToUpdate = dbContext.Skills.Find(skillId);
			skillToUpdate.Level = level;
			skillToUpdate.Summary = summary;
			dbContext.SaveChanges();
		}
	}
}
