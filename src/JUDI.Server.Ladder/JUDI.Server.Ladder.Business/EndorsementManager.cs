using JUDI.Server.Ladder.Data;
using JUDI.Server.Ladder.Data.Entities;

namespace JUDI.Server.Ladder.Business
{
	public class EndorsementManager
	{
		private readonly ClaimRepository claimRepository;
		private readonly EndorsementRepository endorsementRepository;

		public EndorsementManager(ClaimRepository claimRepository, EndorsementRepository endorsementRepository)
		{
			this.claimRepository = claimRepository;
			this.endorsementRepository = endorsementRepository;
		}

		public void AddEndorsement(int claimId, string endorsingUsername, string endorsementMessage)
		{
			Message message = claimRepository.AddMessage(claimId, endorsingUsername, endorsementMessage);
			endorsementRepository.AddEndorsement(claimId, endorsingUsername, message);
		}
	}
}
