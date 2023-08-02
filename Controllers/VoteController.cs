using Microsoft.AspNetCore.Mvc;
using VoteAPI.Models;
using VoteAPI.Data;

namespace VoteAPI.Controllers {

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VoteController : ControllerBase {
        private readonly VoteApiContext _context;

        private readonly ILogger<VoteController> _logger;

        public VoteController(VoteApiContext context, ILogger<VoteController> logger) {
            _context = context;
            _logger = logger;
        }

        private void rob_log(string debug_message) {
            Console.WriteLine(debug_message); 
            _logger.LogDebug(message: debug_message);
        }

        // GetAll
        [HttpGet]
        public JsonResult GetAll() {
            rob_log("gettingAll");
            var context_voter = _context.Voter.ToList();
            var context_voting = _context.Voting.ToList();
            return new JsonResult(Ok(new {context_voter, context_voting}));
        }
    
        // OpenNewVote
        [HttpPost]
        public JsonResult OpenNewVote(Voter voter) {
            rob_log("OpenNewVote");
            var context_open_votes = _context.Voter
                                    .Where(x => x.voteOpen == true)
                                    .Select(x=>x)
                                    .ToList();
            int count = context_open_votes.Count();
            if (count >= 1) {
                string message = "OpenNewVote - Pole Already Open";
                rob_log(message);
                return new JsonResult(BadRequest(new {message, context_open_votes}));
            }
            _context.Voter.Add(voter);
            _context.SaveChanges();
            rob_log("OpenNewVote - Created Pole");
            return new JsonResult(Ok(voter));
        }


        // GetMostRecentVote
        [HttpGet]
        public JsonResult GetMostRecentVote() {
            rob_log("GetMostRecentVote");
            var howManyPoles = _context.Voter.Count();
            if (howManyPoles == 0) {
                rob_log("GetMostRecentVote - No Poles");
                return new JsonResult(Ok("No Poles"));
            }
            
            var most_recent_pole = _context.Voter
                                   .OrderBy(x => x.id)
                                   .Last();

            var voting_in_pole = _context.Voting.Where(v => v.voterId == most_recent_pole.id);
            var aVoteCount = voting_in_pole.Count(v => v.vote.Equals('A'));
            var bVoteCount = voting_in_pole.Count(v => v.vote.Equals('B'));
            rob_log("GetMostRecentVote - Pole");
            return new JsonResult(
                Ok(
                    new {most_recent_pole, aVoteCount, bVoteCount}
                )
            );
        }

        [HttpPost]
        public JsonResult ClosePoll() {
            rob_log("ClosePoll");
            var most_recent_pole = _context.Voter
                                   .Where(x => x.voteOpen == true)
                                   .OrderBy(x => x.id)
                                   .Last();
            most_recent_pole.voteOpen = false;
            _context.SaveChanges();
            return new JsonResult(Ok("Pole Closed"));
        }

        // getActivePole
        [HttpGet]
        public JsonResult getActivePole() {
            rob_log("getActivePole");
            var open_poles = _context.Voter.Where(x => x.voteOpen == true);
            bool open;
            int most_recent_pole_id = 0;

            if (open_poles.Count() == 0) { open = false; }
            else {
                open = true;
                most_recent_pole_id = open_poles.OrderBy(x => x.id).Last().id;
            }
            return new JsonResult(Ok(new {open, most_recent_pole_id}));
        }

        // vote
        [HttpPost]
        public JsonResult Vote(Voting voting) {
            rob_log("Vote");
            var voterInDb = _context.Voter.Find(voting.voterId);
            if(voterInDb == null) {
                rob_log("No Vote In DB");
                return new JsonResult(NotFound("No Vote in DB"));
            }

            var voteInDB = _context.Voting
                            .Where(v => v.userId == voting.userId)
                            .Where(v => v.voterId == voting.voterId)
                            .Select(v => v);

            var count = voteInDB.Count();
            if (count == 0) {
                _context.Voting.Add(voting);
            } else {
                voteInDB.First().vote = voting.vote;
            }

            if (voting.vote.Equals('A') || voting.vote.Equals('B')) {
                _context.SaveChanges();
                rob_log("Voted!");
                return new JsonResult(Ok("Voted!"));
            } else {
                rob_log("Invalid Vote");
                return new JsonResult(NotFound("Invalid Vote"));
            }

        }
    }
}