using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data;

namespace JUDI.Server.Ladder.Business
{
	public class UserManager
	{
		private readonly EndorsementRepository endorsementRepository;
		private readonly ClaimRepository claimRepository;

		public UserManager(ClaimRepository claimRepository, EndorsementRepository endorsementRepository)
		{
			this.endorsementRepository = endorsementRepository;
			this.claimRepository = claimRepository;
		}

		public UserProfileDto GetUserProfile(string username)
		{
			return new UserProfileDto
			{
				ClaimCount = endorsementRepository.GetEndorsedClaimsCountForUser(username),
				EndorsementCount = endorsementRepository.GetEndorsementCountForUser(username),
				Claims = claimRepository.GetClaims(username)
			};
		}
	}
}
