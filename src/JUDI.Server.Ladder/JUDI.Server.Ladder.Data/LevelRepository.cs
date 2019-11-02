using System.Collections.Generic;
using System.Linq;
using JUDI.API.Ladder.Contract;
using JUDI.Server.Ladder.Data.Entities;

namespace JUDI.Server.Ladder.Data
{
	public class LevelRepository
	{
		private readonly LadderDbContext dbContext;

		public LevelRepository(LadderDbContext dbContext)
		{
			this.dbContext = dbContext;
		}

		public Level Get(int id)
		{
			return dbContext.Levels.Find(id);
		}

		public IEnumerable<LevelDto> GetAll()
		{
			return dbContext
					.Levels
					.Select(level => new LevelDto
					{
						Id = level.Id,
						Name = level.Name
					});
		}
	}
}
