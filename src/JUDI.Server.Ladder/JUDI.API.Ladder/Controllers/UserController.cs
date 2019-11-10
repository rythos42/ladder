using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Business;
using Microsoft.AspNetCore.Mvc;

namespace JUDI.API.Ladder.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly UserManager userManager;

		public UserController(UserManager userManager)
		{
			this.userManager = userManager;
		}

		[HttpGet]
		[Route("{username}")]
		public ActionResult<OkResponse<UserProfileDto>> GetUserProfile(string username)
		{
			return Ok(new OkResponse<UserProfileDto>(userManager.GetUserProfile(username)));
		}
	}
}
