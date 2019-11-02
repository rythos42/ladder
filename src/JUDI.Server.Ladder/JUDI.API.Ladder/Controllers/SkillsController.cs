using System;
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

		[HttpPost]
		[Route("")]
		public ActionResult AddSkill(AddSkillDto addSkillDto)
		{
			if (addSkillDto == null)
				throw new ArgumentNullException(nameof(addSkillDto));

			skillRepository.Add(addSkillDto.Username, addSkillDto.Level, addSkillDto.Summary);
			return Ok();
		}

		[HttpPatch]
		[Route("")]
		public ActionResult PatchSkill(PatchSkillDto patchSkillDto)
		{
			if (patchSkillDto == null)
				throw new ArgumentNullException(nameof(patchSkillDto));

			skillRepository.Update(patchSkillDto.PatchedByUsername, patchSkillDto.SkillId, patchSkillDto.Level, patchSkillDto.Summary);
			return Ok();
		}
	}
}
