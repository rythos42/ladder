using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace JUDI.Server.Ladder.Business
{
	public class EmailManager
	{
		private readonly SendGridClient client;
		private readonly SingleEmailConfiguration claimEmail;
		private readonly string fromEmail;
		private readonly string ladderSiteUrl;

		private readonly ILogger<EmailManager> logger;

		public EmailManager(EmailConfiguration emailConfiguration, ApplicationConfiguration applicationConfiguration, ILogger<EmailManager> logger)
		{
			claimEmail = emailConfiguration.Claim;
			client = new SendGridClient(emailConfiguration.SendGridApiKey);
			fromEmail = emailConfiguration.FromEmail;

			ladderSiteUrl = applicationConfiguration.LadderSiteUrl;

			this.logger = logger;
		}

		public async Task SendEmailToEndorsers(string emailString, string whoToEndorse)
		{
			var subject = claimEmail.Subject.Replace("{username}", whoToEndorse);
			var content = claimEmail.Content.Replace("{ladderSiteUrl}", ladderSiteUrl);
			await Send(emailString, subject, content);
		}

		public async Task Send(string emailString, string subject, string content)
		{
			var recipients = emailString.Split(new[] { ',', ';' }).Select(email => new EmailAddress(email)).ToList();
			var message = new SendGridMessage();
			message.AddTos(recipients);
			message.SetSubject(subject);
			message.AddContent(MimeType.Html, content);
			message.From = new EmailAddress(fromEmail);

			Response response = await client.SendEmailAsync(message);
			if (response.StatusCode != HttpStatusCode.OK && response.StatusCode != HttpStatusCode.Accepted)
			{
				var errorBody = await response.Body.ReadAsStringAsync();
				logger.LogError(errorBody);
			}
		}
	}
}
