using System.Collections.Generic;
using System.Linq;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data;
using Microsoft.AspNetCore.Mvc;

namespace JUDI.API.Ladder.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ClaimsController : ControllerBase
	{
		private readonly ClaimRepository claimRepository;
		private readonly EndorsementRepository endorsementRepository;

		public ClaimsController(ClaimRepository claimRepository, EndorsementRepository endorsementRepository)
		{
			this.claimRepository = claimRepository;
			this.endorsementRepository = endorsementRepository;
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
		public ActionResult Claim(string username, ClaimSkillDto claimSkillDto)
		{
			if (claimSkillDto == null)
				throw new ArgumentNullException(nameof(claimSkillDto));
			claimRepository.AddClaim(username, claimSkillDto.SkillId, claimSkillDto.ClaimEvidence, claimSkillDto.EndorserEmails);
			return Ok();
		}

		[HttpPost]
		[Route("{claimId}/endorse")]
		public ActionResult Endorse(int claimId, EndorseClaimDto endorseClaimDto)
		{
			if (endorseClaimDto == null)
				throw new ArgumentNullException(nameof(endorseClaimDto));

			endorsementRepository.AddEndorsement(claimId, endorseClaimDto.EndorserUsername, endorseClaimDto.EndorsementEvidence);
			return Ok();
		}
	}
}
