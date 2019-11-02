using System.Collections.Generic;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data;
using Microsoft.AspNetCore.Mvc;

namespace JUDI.API.Ladder.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LevelsController : ControllerBase
	{
		private readonly LevelRepository levelRepository;

		public LevelsController(LevelRepository levelRepository)
		{
			this.levelRepository = levelRepository;
		}

		[HttpGet]
		[Route("")]
		public ActionResult<OkResponse<IEnumerable<LevelDto>>> GetAllLevels()
		{
			return new OkResponse<IEnumerable<LevelDto>>(levelRepository.GetAll());
		}
	}
}
