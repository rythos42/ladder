using System.Collections.Generic;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data;
using JUDI.Server.Ladder.Data.Entities;

namespace JUDI.Server.Ladder.Business
{
	public class ClaimManager
	{
		private readonly ClaimRepository claimRepository;

		public ClaimManager(ClaimRepository claimRepository)
		{
			this.claimRepository = claimRepository;
		}

		public IEnumerable<ClaimDto> GetClaimsForNotUser(string username)
		{
			return claimRepository.GetClaims(claim => claim.ClaimingUsername != username);
		}

		public IEnumerable<ClaimDto> GetClaims(string username)
		{
			return claimRepository.GetClaims(claim => claim.ClaimingUsername == username);
		}

		public void AddClaim(string username, int skillId, string claimEvidence, string endorserEmails)
		{
			claimRepository.AddClaim(username, skillId, claimEvidence, endorserEmails);
		}

		public Message AddMessage(int claimId, string authorUsername, string messageText)
		{
			return claimRepository.AddMessage(claimId, authorUsername, messageText);
		}

		public IEnumerable<ClaimMessageDto> GetMessages(int claimId)
		{
			return claimRepository.GetMessages(claimId);
		}
	}
}
