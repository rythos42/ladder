using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Business;
using JUDI.Server.Ladder.Data;
using Microsoft.AspNetCore.Mvc;

namespace JUDI.API.Ladder.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ClaimsController : ControllerBase
	{
		private readonly ClaimRepository claimRepository;
		private readonly EndorsementManager endorsementManager;
		private readonly EmailManager emailManager;

		public ClaimsController(ClaimRepository claimRepository, EndorsementManager endorsementManager, EmailManager emailManager)
		{
			this.claimRepository = claimRepository;
			this.endorsementManager = endorsementManager;
			this.emailManager = emailManager;
		}

		[HttpGet]
		[Route("not/{username}")]
		public ActionResult<OkResponse<IEnumerable<ClaimDto>>> GetClaimsForNotUser(string username)
		{
			var claims = claimRepository.GetClaimsForNotUser(username).ToList();
			return new OkResponse<IEnumerable<ClaimDto>>(claims);
		}

		[HttpPost]
		[Route("{username}")]
		public async Task<ActionResult> Claim(string username, ClaimSkillDto claimSkillDto)
		{
			if (claimSkillDto == null)
				throw new ArgumentNullException(nameof(claimSkillDto));

			claimRepository.AddClaim(username, claimSkillDto.SkillId, claimSkillDto.ClaimEvidence, claimSkillDto.EndorserEmails);

			await emailManager.SendEmailToEndorsers(claimSkillDto.EndorserEmails, username).ConfigureAwait(false);

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
		public ActionResult AddMessage(int claimId, AddMessageDto addMessageDto)
		{
			if (addMessageDto == null)
				throw new ArgumentNullException(nameof(addMessageDto));

			claimRepository.AddMessage(claimId, addMessageDto.AuthorUsername, addMessageDto.Message);
			return Ok();
		}

		[HttpGet]
		[Route("{claimId}/message")]
		public ActionResult<OkResponse<IEnumerable<ClaimMessageDto>>> GetMessages(int claimId)
		{
			var messages = claimRepository.GetMessages(claimId);
			return new OkResponse<IEnumerable<ClaimMessageDto>>(messages);
		}
	}
}
