using Microsoft.AspNetCore.Mvc;
using VoteAPI.Models;
using VoteAPI.Data;

namespace VoteAPI.Controllers {

    [ApiController]
    [Route("api/[action]")]
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

        ////////////////////////////////////////////

        // GetAll
        [HttpGet]
        public JsonResult GetAll() {
            rob_log("gettingAll");
            var context_shows = _context.Shows.ToList();
            var context_voter = _context.Voter.ToList();
            var context_voting = _context.Voting.ToList();
            return new JsonResult(Ok(new {context_shows, context_voter, context_voting}));
        }
        
        // Delete
        [HttpDelete]
        public JsonResult ClearAll() {
            rob_log("clearAll");
            _context.Shows.RemoveRange(_context.Shows);
            _context.Voter.RemoveRange(_context.Voter);
            _context.Voting.RemoveRange(_context.Voting);
            _context.SaveChanges();
            return new JsonResult(Ok());    
        }

        ////////////////////////////////////////////

        private bool isOpenShow() {
            var open_shows_count = _context.Shows.Count(x => x.showStart == true);
            if (open_shows_count == 1) return true;
            else return false;
        }

        private Shows getOpenShow() {
            return _context.Shows.Where(x => x.showStart == true).OrderBy(x => x.id).Last();
        }   

        private JsonResult badShowDebug(string log_message) {
                rob_log(log_message);
                var open_shows_list = _context.Shows.Where(x => x.showStart == true).Select(x=>x).ToList();
                return new JsonResult(BadRequest(new {log_message, open_shows_list}));
        }

        // OpenNewShow
        [HttpPost]
        public JsonResult StartTheShow(Shows show) {
            rob_log("StartTheShow");
            if (isOpenShow()) {
                return badShowDebug("StartTheShow - Show Already Started");
            }
            _context.Shows.Add(show);
            _context.SaveChanges();
            rob_log("StartTheShow - Started Show");
            return new JsonResult(Ok(show));            
        }

        //EndTheShow
        [HttpPost]
        public JsonResult EndTheShow() {
            rob_log("EndTheShow");
            if (!isOpenShow()) {
                return badShowDebug("EndTheShow - No Single Active Show");
            }
            var openShow = getOpenShow();
            openShow.showStart = false;

            if (isOpenVote()) {
                var most_recent_pole = getOpenVote();
                most_recent_pole.voteOpen = false;
            }

            _context.SaveChanges();
            return new JsonResult(Ok("Show Ended"));
        }

        ////////////////////////////////////////////

        private bool isOpenVote() {
            var open_vote_count = _context.Voter.Count(x => x.voteOpen == true);
            if (open_vote_count == 1) return true;
            else return false;
        }

        private Voter getOpenVote() {
            return _context.Voter.Where(x => x.voteOpen == true).OrderBy(x => x.id).Last();
        }

        private JsonResult badVoteDebug(string log_message) {
            rob_log(log_message);
            var open_vote_list = _context.Voter.Where(x => x.voteOpen == true).Select(x=>x).ToList();
            return new JsonResult(BadRequest(new {log_message, open_vote_list}));
        }

        // OpenNewVote
        [HttpPost]
        public JsonResult OpenNewVote(Voter voter) {
            rob_log("OpenNewVote");
            if (!isOpenShow()) {
                return badShowDebug("OpenNewVote - No Single Active Show");
            }
            if(isOpenVote()) {
                return badVoteDebug("OpenNewVote - Pole Already Open");
            }
            var openShow = getOpenShow();
            voter.show_id = openShow.id;

            _context.Voter.Add(voter);
            _context.SaveChanges();
            rob_log("OpenNewVote - Created Pole");
            return new JsonResult(Ok(voter));
        }

        // CloseVote
        [HttpPost]
        public JsonResult CloseVote() {
            rob_log("CloseVote");
            if (!isOpenShow()) {
                return badShowDebug("CloseVote - No Single Active Show");
            }
            if(!isOpenVote()) {
                return badVoteDebug("CloseVote - No Single Active Vote");
            }
            var most_recent_pole = getOpenVote();
            most_recent_pole.voteOpen = false;
            _context.SaveChanges();
            return new JsonResult(Ok("Pole Closed"));
        }

        ////////////////////////////////////////////
        private Voter getMostRecentVoteIDInShow(int showId) {
            int count = _context.Voter.Count(x => x.show_id == show_id);
            if (count == 0) return -1;
            return _context.Voter.Where(x => x.show_id == showId).OrderBy(x => x.id).Last().id;
        }

        private int getVotingCount(int pole_id, char C) {
            return _context.Voting.Where(v => v.voterId == pole_id).Count(v => v.vote.Equals(C));
        }

        // getPollInfo  getActivePole
        [HttpGet]
        public JsonResult getPollInfo() {
            rob_log("getPollInfo");
            bool openShow = isOpenShow();
            bool openVote = isOpenVote();
            int activeShowId = (openShow) ? getOpenShow().id : 0;
            int recentPollId = (openShow) ? getMostRecentVoteIDInShow(activeShowId) : 0;
            int aVoteCount = (openShow) ? getVotingCount(recentPollId, 'A') : 0;
            int bVoteCount = (openShow) ? getVotingCount(recentPollId, 'B') : 0;

            return new JsonResult(Ok(new {openShow, openVote, activeShowId, recentPollId, aVoteCount, bVoteCount}));
        }

        ////////////////////////////////////////////

        private string validateVote(Voting voting) {
            bool openShow = isOpenShow();
            bool openVote = isOpenVote();
            if (!openShow || !openVote) return "Voting is Not Open";
            
            var currentVote = getOpenVote();
            if (currentVote.id != voting.voterId) return "Incorrect Pole ID";
                
            if(!(voting.vote.Equals('A') || voting.vote.Equals('B')))  return "Invalid Vote";

            return "";
        }

        // vote
        [HttpPost]
        public JsonResult Vote(Voting voting) {
            rob_log("Vote");
            string validateVoteStr = validateVote(voting);
            if (validateVoteStr != "") {
                rob_log(validateVoteStr);
                return new JsonResult(NotFound(validateVoteStr));
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
            _context.SaveChanges();
            rob_log("Voted!");
            return new JsonResult(Ok("Voted!"));
        }
    }
}