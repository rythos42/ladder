using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Business;
using Microsoft.AspNetCore.Mvc;

namespace JUDI.API.Ladder.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ClaimsController : ControllerBase
	{
		private readonly EndorsementManager endorsementManager;
		private readonly ClaimManager claimManager;

		public ClaimsController(ClaimManager claimManager, EndorsementManager endorsementManager)
		{
			this.endorsementManager = endorsementManager;
			this.claimManager = claimManager;
		}

		[HttpGet]
		[Route("")]
		public ActionResult<OkResponse<IEnumerable<ClaimDto>>> GetClaims()
		{
			var claims = claimManager.GetAllClaims();
			return new OkResponse<IEnumerable<ClaimDto>>(claims);
		}

		[HttpPost]
		[Route("{username}")]
		public async Task<ActionResult> Claim(string username, ClaimSkillDto claimSkillDto)
		{
			if (claimSkillDto == null)
				throw new ArgumentNullException(nameof(claimSkillDto));

			await claimManager.AddClaim(username, claimSkillDto.SkillId, claimSkillDto.ClaimEvidence, claimSkillDto.EndorserEmails).ConfigureAwait(false);

			return Ok();
		}

		[HttpPost]
		[Route("{claimId}/endorse")]
		public ActionResult Endorse(int claimId, EndorseClaimDto endorseClaimDto)
		{
			if (endorseClaimDto == null)
				throw new ArgumentNullException(nameof(endorseClaimDto));

			endorsementManager.AddEndorsement(claimId, endorseClaimDto.EndorserUsername, endorseClaimDto.Message);
			return Ok();
		}

		[HttpPost]
		[Route("{claimId}/message")]
		public async Task<ActionResult> AddMessage(int claimId, AddMessageDto addMessageDto)
		{
			if (addMessageDto == null)
				throw new ArgumentNullException(nameof(addMessageDto));

			await claimManager.AddMessage(claimId, addMessageDto.AuthorUsername, addMessageDto.Message).ConfigureAwait(false);
			return Ok();
		}

		[HttpGet]
		[Route("{claimId}/message")]
		public ActionResult<OkResponse<IEnumerable<ClaimMessageDto>>> GetMessages(int claimId)
		{
			IEnumerable<ClaimMessageDto> messages = claimManager.GetMessages(claimId);
			return new OkResponse<IEnumerable<ClaimMessageDto>>(messages);
		}
	}
}
