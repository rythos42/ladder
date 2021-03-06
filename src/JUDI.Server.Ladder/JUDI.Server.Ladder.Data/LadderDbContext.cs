﻿using JUDI.Server.Ladder.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace JUDI.Server.Ladder.Data
{
	public class LadderDbContext : DbContext
	{
		public LadderDbContext(DbContextOptions<LadderDbContext> options) : base(options)
		{
		}

		public DbSet<Skill> Skills { get; set; }
		public DbSet<Claim> Claims { get; set; }
		public DbSet<Endorsement> Endorsements { get; set; }
		public DbSet<Level> Levels { get; set; }
		public DbSet<Message> Messages { get; set; }
		public DbSet<ClaimMessage> ClaimMessages { get; set; }
	}
}
