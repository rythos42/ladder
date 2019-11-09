using System;
using System.Linq;
using JUDI.Server.Ladder.Data.Entities;

namespace JUDI.Server.Ladder.Data
{
	public class EndorsementRepository
	{
		private readonly LadderDbContext dbContext;

		public EndorsementRepository(LadderDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public void AddEndorsement(int claimId, string endorserUsername, Message message)
		{
			dbContext.Endorsements.Add(new Endorsement
			{
				EndorsedClaim = dbContext.Claims.Single(claim => claim.Id == claimId),
				EndorserUsername = endorserUsername,
				EndorsementDate = DateTime.Now,
				Message = message
			});
			dbContext.SaveChanges();
		}

		public int GetEndorsementCountForUser(string username)
		{
			return dbContext.Endorsements.Count(endorsement => endorsement.EndorserUsername == username);
		}

		public int GetEndorsedClaimsCountForUser(string username)
		{
			return dbContext.Endorsements.Count(endorsement => endorsement.EndorsedClaim.ClaimingUsername == username);
		}
	}
}
