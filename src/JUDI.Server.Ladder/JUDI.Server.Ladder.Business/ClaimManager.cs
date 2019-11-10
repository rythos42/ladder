using System.Collections.Generic;
using System.Threading.Tasks;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data;

namespace JUDI.Server.Ladder.Business
{
	public class ClaimManager
	{
		private readonly ClaimRepository claimRepository;
		private readonly EmailManager emailManager;

		public ClaimManager(ClaimRepository claimRepository, EmailManager emailManager)
		{
			this.claimRepository = claimRepository;
			this.emailManager = emailManager;
		}

		public IEnumerable<ClaimDto> GetAllAwaitingClaims()
		{
			return claimRepository.GetClaims(claim => claim.Endorsed == false);
		}

		public IEnumerable<ClaimDto> GetClaims(string username)
		{
			return claimRepository.GetClaims(claim => claim.ClaimingUsername == username);
		}

		public async Task AddClaim(string username, int skillId, string claimEvidence, string endorserEmails)
		{
			claimRepository.AddClaim(username, skillId, claimEvidence, endorserEmails);
			await emailManager.SendEmailToEndorsers(endorserEmails, username).ConfigureAwait(false);
		}

		public async Task AddMessage(int claimId, string authorUsername, string messageText)
		{
			claimRepository.AddMessage(claimId, authorUsername, messageText);

			var claim = claimRepository.GetClaim(claimId);
			await emailManager.SendNewMessageEmailTo(claim.ClaimingUsername, authorUsername).ConfigureAwait(false);
		}

		public IEnumerable<ClaimMessageDto> GetMessages(int claimId)
		{
			return claimRepository.GetMessages(claimId);
		}
	}
}
