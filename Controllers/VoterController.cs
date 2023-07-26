using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VoteAPI.Models;
using VoteAPI.Data;

namespace VoteAPI.Controllers {

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VoteController : ControllerBase {
        private readonly VoteApiContext _context;

        public VoteController(VoteApiContext context) {
            _context = context;
        }

        // Get
        [HttpGet]
        public JsonResult Get() {
            return new JsonResult(Ok());
        }
        
    }
}