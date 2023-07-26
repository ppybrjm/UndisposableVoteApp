using Microsoft.EntityFrameworkCore;
using VotingAPI.Models;

namespace VotingAPI.Data {
    public class VotingApiContext : DbContext {
        public DbSet<Voting> Voting {get; set; }

        public VotingApiContext(DbContextOptions<VotingApiContext> options) 
            : base(options) {
            
        }
    }

}