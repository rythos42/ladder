using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace JUDI.Server.Ladder.Data.Entities
{
	public class Message
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }
		public string Text { get; set; }
		public string AuthorUsername { get; set; }
		public DateTime WrittenOnDate { get; set; }
	}
}
