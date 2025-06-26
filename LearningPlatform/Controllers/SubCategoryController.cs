using Bl.Interfaces;
using Bl.Services;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoryController : ControllerBase
    {
        private readonly ISubCategoryService _subCategoryService;

        public SubCategoryController(ISubCategoryService subCategoryService)
        {
            _subCategoryService = subCategoryService;
        }

        [HttpGet("GetAllSubCategories")]
        public IActionResult GetSubCategories()
        {
            var subCategories = _subCategoryService.GetAllSubCategories();
            return Ok(subCategories);
        }

        [HttpGet("{id}GetlSubCategoryById")]
        public async Task<IActionResult> GetSubCategoryById(int id)
        {
            var subCategory = await _subCategoryService.GetSubCategoryNameByIdAsync(id);
            if (subCategory == null)
            {
                return NotFound();
            }
            return Ok(subCategory);
        }
    }
}
