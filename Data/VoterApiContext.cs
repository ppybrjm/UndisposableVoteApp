using Microsoft.EntityFrameworkCore;
using VoterAPI.Models;

namespace VoterAPI.Data {
    public class VoterApiContext : DbContext {
        public DbSet<Voter> Voter {get; set; }

        public VoterApiContext(DbContextOptions<VoterApiContext> options) 
            : base(options) {
            
        }
    }

}