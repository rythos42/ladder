using System;
using System.Collections.Generic;
using System.Linq;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data.Entities;

namespace JUDI.Server.Ladder.Data
{
	public class ClaimRepository
	{
		private readonly LadderDbContext dbContext;

		public ClaimRepository(LadderDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public IEnumerable<ClaimDto> GetClaimsForNotUser(string username)
		{
			return from claim in dbContext.Claims
				   from skill in dbContext.Skills
						.Where(skill => skill.Id == claim.Skill.Id)
				   where claim.ClaimingUsername != username
				   select new ClaimDto
				   {
					   Id = claim.Id,
					   FromUsername = claim.ClaimingUsername,
					   SkillSummary = skill.Summary,
					   ClaimEvidence = claim.ClaimEvidence
				   };
		}

		public void AddClaim(string username, int skillId, string claimEvidence, string endorserEmails)
		{
			dbContext.Claims.Add(new Claim
			{
				ClaimDate = DateTime.Now,
				ClaimEvidence = claimEvidence,
				ClaimingUsername = username,
				Skill = dbContext.Skills.Single(skill => skill.Id == skillId),
				TaggedEndorserEmails = endorserEmails
			});
			dbContext.SaveChanges();
		}
	}
}
