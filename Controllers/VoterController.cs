using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoterAPI.Models;
using VoterAPI.Data;

namespace VoterAPI.Controllers {

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VoterController : ControllerBase {
        private readonly VoterApiContext _context;

        public VoterController(VoterApiContext context) {
            _context = context;
        }

        // Create/Edit
        [HttpPost]
        public JsonResult SetVoter(Voter voter) {
            if(voter.id == 0) {
                _context.Voter.Add(voter);
            } else {
                var voterInDb = _context.Voter.Find(voter.id);
                if(voterInDb == null) {
                    return new JsonResult(NotFound());
                }
                voterInDb = voter;
            }
            _context.SaveChanges();
            return new JsonResult(Ok(voter));
        }

        // Get
        [HttpGet]
        public JsonResult Get() {
            return new JsonResult(Ok());
        }
        
    }
}