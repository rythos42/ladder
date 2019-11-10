using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data;

namespace JUDI.Server.Ladder.Business
{
	public class UserManager
	{
		private readonly EndorsementRepository endorsementRepository;
		private readonly ClaimManager claimManager;

		public UserManager(ClaimManager claimManager, EndorsementRepository endorsementRepository)
		{
			this.endorsementRepository = endorsementRepository;
			this.claimManager = claimManager;
		}

		public UserProfileDto GetUserProfile(string username)
		{
			return new UserProfileDto
			{
				ClaimCount = endorsementRepository.GetEndorsedClaimsCountForUser(username),
				EndorsementCount = endorsementRepository.GetEndorsementCountForUser(username),
				Claims = claimManager.GetClaims(username)
			};
		}
	}
}
