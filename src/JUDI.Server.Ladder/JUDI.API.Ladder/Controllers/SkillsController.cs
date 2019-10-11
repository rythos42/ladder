using System.Collections.Generic;
using System.Linq;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data;
using Microsoft.AspNetCore.Mvc;

namespace JUDI.API.Ladder.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class SkillsController : ControllerBase
	{
		private readonly SkillRepository skillRepository;

		public SkillsController(SkillRepository skillRepository)
		{
			this.skillRepository = skillRepository;
		}

		[HttpGet]
		[Route("{username}")]
		public ActionResult<OkResponse<IEnumerable<SkillDto>>> Get(string username)
		{
			var skills = skillRepository.Get(username).ToList();
			return Ok(new OkResponse<List<SkillDto>>(skills));
		}
	}
}
