using Microsoft.EntityFrameworkCore;
using VoteAPI.Models;

namespace VoteAPI.Data {
    public class VoteApiContext : DbContext {
        public DbSet<Voting> Voting {get; set; }
        public DbSet<Voter> Voter {get; set; }

        public VoteApiContext(DbContextOptions<VoteApiContext> options) 
            : base(options) {
            
        }
    }

}