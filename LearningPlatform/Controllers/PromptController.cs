using Bl.Interfaces;
using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PromptController : ControllerBase
    {
        private readonly IPromptService _promptService;

        public PromptController(IPromptService promptService)
        {
            _promptService = promptService;
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitPromptAsync([FromBody] Prompt dto)
        {
            var prompt = new Prompt
            {
                UserId = dto.UserId,
                CategoryId = dto.CategoryId,
                SubCategoryId = dto.SubCategoryId,
                Prompt_a = dto.Prompt_a,
            };

            var lesson = await _promptService.SubmitPrompt(prompt);

            return Ok(lesson);
        }

    }
}
