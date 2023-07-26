using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VotingAPI.Models;
using VotingAPI.Data;

namespace VotingAPI.Controllers {

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VotingController : ControllerBase {
        private readonly VotingApiContext _context;

        public VotingController(VotingApiContext context) {
            _context = context;
        }

        // Get
        [HttpGet]
        public JsonResult Get() {
            return new JsonResult(Ok());
        }
    }   
}

