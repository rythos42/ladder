using System.Collections.Generic;

namespace JUDI.Server.Ladder.Utils
{
	public class Email
	{
		public static IEnumerable<string> GetEmails(string emailString)
		{
			return emailString.Split(new[] { ',', ';' });
		}
	}
}
