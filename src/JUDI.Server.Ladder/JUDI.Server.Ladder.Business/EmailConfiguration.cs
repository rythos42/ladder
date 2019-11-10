namespace JUDI.Server.Ladder.Business
{
	public class EmailConfiguration
	{
		public string SendGridApiKey { get; set; }
		public SingleEmailConfiguration Claim { get; set; }
		public SingleEmailConfiguration NewMessage { get; set; }
		public string FromEmail { get; set; }
	}

	public class SingleEmailConfiguration
	{
		public string Subject { get; set; }
		public string Content { get; set; }
	}
}
