using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data;
using Microsoft.AspNetCore.Mvc;

namespace JUDI.API.Ladder.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly ClaimRepository claimRepository;
		private readonly EndorsementRepository endorsementRepository;

		public UserController(ClaimRepository claimRepository, EndorsementRepository endorsementRepository)
		{
			this.claimRepository = claimRepository;
			this.endorsementRepository = endorsementRepository;
		}

		[HttpGet]
		[Route("{username}")]
		public ActionResult<OkResponse<UserProfileDto>> GetUserProfile(string username)
		{
			return Ok(new OkResponse<UserProfileDto>(new UserProfileDto
			{
				ClaimCount = claimRepository.GetClaimCountForUser(username),
				EndorsementCount = endorsementRepository.GetEndorsementCountForUser(username)
			}));
		}
	}
}
