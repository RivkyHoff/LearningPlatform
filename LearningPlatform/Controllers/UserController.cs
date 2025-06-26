using Bl.Interfaces;
using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {

            if (_userService.UserExists(user))
            {
                return BadRequest("User already exists. You can log in instead.");
            }

            _userService.RegisterUser(user);
            return Ok("User registered successfully.");
        }

        [HttpPost("exists")]
        public IActionResult UserExists([FromQuery] User user)
        {
            bool exists = _userService.UserExists(user);
            return Ok(exists);
        }

        [HttpGet("GetAllTheLastResponses")]
        public IActionResult GetResponsesByUserId([FromQuery] int userId)
        {
            var responses = _userService.GetResponsesByUserId(userId);
            if (responses == null || responses.Count == 0)
                return NotFound("No responses found for this user.");

            return Ok(responses);
        }

    }
}
