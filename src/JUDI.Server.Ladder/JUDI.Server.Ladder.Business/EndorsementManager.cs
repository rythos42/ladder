using System.Threading.Tasks;
using JUDI.Server.Ladder.Data;
using JUDI.Server.Ladder.Data.Entities;

namespace JUDI.Server.Ladder.Business
{
	public class EndorsementManager
	{
		private readonly ClaimRepository claimRepository;
		private readonly EndorsementRepository endorsementRepository;
		private readonly EmailManager emailManager;

		public EndorsementManager(ClaimRepository claimRepository, EndorsementRepository endorsementRepository, EmailManager emailManager)
		{
			this.claimRepository = claimRepository;
			this.endorsementRepository = endorsementRepository;
			this.emailManager = emailManager;
		}

		public async Task AddEndorsement(int claimId, string endorsingUsername, string endorsementMessage)
		{
			Message message = claimRepository.AddMessage(claimId, endorsingUsername, endorsementMessage);
			endorsementRepository.AddEndorsement(claimId, endorsingUsername, message);

			var claim = claimRepository.GetClaim(claimId);
			await emailManager.SendNewMessageEmailTo(claim.ClaimingUsername, endorsingUsername).ConfigureAwait(false);
		}
	}
}
