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
		private readonly LevelRepository levelRepository;

		public SkillRepository(LadderDbContext dbContext, LevelRepository levelRepository)
		{
			this.dbContext = dbContext;
			this.levelRepository = levelRepository;
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
					   LevelId = skill.Level.Id,
					   Claimed = claim != null,
					   Endorsed = endorsement != null
				   };
		}

		public void Add(string addedByUsername, int levelId, string summary)
		{
			dbContext.Skills.Add(new Skill
			{
				AddedByUsername = addedByUsername,
				Level = levelRepository.Get(levelId),
				Summary = summary,
				AddedOn = DateTime.Now
			});
			dbContext.SaveChanges();
		}

		public void Update(string updatedByUsername, int skillId, int levelId, string summary)
		{
			Skill skillToUpdate = dbContext.Skills.Find(skillId);
			skillToUpdate.Level = levelRepository.Get(levelId);
			skillToUpdate.Summary = summary;
			dbContext.SaveChanges();
		}
	}
}
