using System;
using System.Collections.Generic;
using System.Linq;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data.Entities;

namespace JUDI.Server.Ladder.Data
{
	public class ClaimRepository
	{
		private readonly LadderDbContext dbContext;

		public ClaimRepository(LadderDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public IEnumerable<ClaimDto> GetClaimsForNotUser(string username)
		{
			return from claim in dbContext.Claims
				   from skill in dbContext.Skills
						.Where(skill => skill.Id == claim.Skill.Id)
				   where claim.ClaimingUsername != username
				   select new ClaimDto
				   {
					   Id = claim.Id,
					   FromUsername = claim.ClaimingUsername,
					   SkillSummary = skill.Summary,
					   ClaimEvidence = claim.ClaimEvidence,
					   Messages = claim.Messages.Select(claimMessage => new ClaimMessageDto
					   {
						   AuthorUsername = claimMessage.Message.AuthorUsername,
						   Text = claimMessage.Message.Text,
						   WrittenOnDate = claimMessage.Message.WrittenOnDate
					   })
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
				.Select(claimMessage => new ClaimMessageDto
				{
					AuthorUsername = claimMessage.Message.AuthorUsername,
					Text = claimMessage.Message.Text,
					WrittenOnDate = claimMessage.Message.WrittenOnDate
				});
		}
	}
}
