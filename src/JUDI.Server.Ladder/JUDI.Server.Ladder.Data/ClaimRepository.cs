using System;
using System.Collections.Generic;
using System.Linq;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace JUDI.Server.Ladder.Data
{
	public class ClaimRepository
	{
		private readonly LadderDbContext dbContext;

		public ClaimRepository(LadderDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public Claim GetClaim(int id)
		{
			return dbContext.Claims.Find(id);
		}

		public IEnumerable<ClaimDto> GetClaims(Func<Claim, bool> filter)
		{
			return dbContext
				.Claims
				.Include(claim => claim.Skill)
					.ThenInclude(skill => skill.Level)
				.Include(claim => claim.Messages)
				.Where(filter)
				.ToList()   // load all requested claims, to prevent "Multiple open DataReaders" error
				.Select(claim => new ClaimDto
				{
					Id = claim.Id,
					FromUsername = claim.ClaimingUsername,
					LevelId = claim.Skill.Level.Id,
					SkillSummary = claim.Skill.Summary,
					ClaimEvidence = claim.ClaimEvidence,
					Messages = dbContext
						.ClaimMessages
						.Where(claimMessage => claimMessage.ClaimId == claim.Id)
						.Include(claimMessage => claimMessage.Message)
						.ToList()
						.Select(AssembleClaimMessageDto),
					ClaimDate = claim.ClaimDate,
					Endorsed = dbContext.Endorsements.Any(endorsement => endorsement.EndorsedClaim.Id == claim.Id)
				});
		}

		private ClaimMessageDto AssembleClaimMessageDto(ClaimMessage claimMessage)
		{
			return new ClaimMessageDto
			{
				AuthorUsername = claimMessage.Message.AuthorUsername,
				Text = claimMessage.Message.Text,
				WrittenOnDate = claimMessage.Message.WrittenOnDate
			};
		}

		public void AddClaim(string username, int skillId, string claimEvidence, string endorserEmails)
		{
			dbContext.Claims.Add(new Claim
			{
				ClaimDate = DateTime.Now,
				ClaimEvidence = claimEvidence,
				ClaimingUsername = username,
				Skill = dbContext.Skills.Single(skill => skill.Id == skillId),
				TaggedEndorserEmails = endorserEmails
			});
			dbContext.SaveChanges();
		}

		public Message AddMessage(int claimId, string authorUsername, string messageText)
		{
			Claim claim = dbContext.Claims.Find(claimId);
			var message = new Message { AuthorUsername = authorUsername, Text = messageText, WrittenOnDate = DateTime.Now };
			claim.Messages.Add(new ClaimMessage { Message = message });
			dbContext.SaveChanges();
			return message;
		}

		public IEnumerable<ClaimMessageDto> GetMessages(int claimId)
		{
			return dbContext
				.Claims
				.Where(claim => claim.Id == claimId)
				.SelectMany(claim => claim.Messages)
				.Select(AssembleClaimMessageDto);
		}
	}
}
