using BeHealth.Business.Managers;
using BeHealth.Business.Models;
using BeHealth.Business.Models.FoodManamgnet.FoodItems;
using BeHealth.Business.Models.FoodManamgnet.Meals;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeHealth.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeManager _mealManager;
        public RecipeController(
            IRecipeManager mealManager
            )
        {
            _mealManager = mealManager;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllRecipes([FromQuery] string name)
        {
            var result = await _mealManager.GetAllRecipes(name);

            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipe(long id)
        {
            var result = await _mealManager.GetRecipe(id);

            return Ok(result);
        }


        [HttpPost]
        public async Task<IActionResult> PostRecipe(RecipeModel model)
        {
            var result = await _mealManager.CreateRecipe(model);

            return Created(nameof(PostRecipe), result);
        }

        // TODO: create put meal endpoint

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipe(long id)
        {
            var result = await _mealManager.DeleteRecipe(id);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(long id, RecipeModel model)
        {
            var result = await _mealManager.UpdateRecipe(id, model);

            return Ok(result);
        }

        [HttpPatch("{id}/category/{category}")]
        public async Task<IActionResult> AddRecipeCategory(long id, string category)
        {
            var result = await _mealManager.AddRecipeCategory(id, category);

            return Ok(result);
        }

        [HttpPost("{recupeId}/food/{foodId}")]
        public async Task<IActionResult> AddRecipeItem(long recupeId,  long foodId, FoodItemModel model)
        {
            var result = await _mealManager.AddRecipeItem(recupeId, foodId, model);

            return Ok(result);
        }

        [HttpPatch("{recupeId}/food/{foodId}")]
        public async Task<IActionResult> UpdateRecipeItem(long recupeId, long foodId, FoodItemModel model)
        {
            var result = await _mealManager.UpdateRecipeItem(recupeId, foodId, model);

            return Ok(result);
        }

        [HttpDelete("{recupeId}/food/{foodId}")]
        public async Task<IActionResult> DeleteRecipeItem(long recupeId, long foodId)
        {
            var result = await _mealManager.RemoveRecipeItem(recupeId, foodId);

            return Ok(result);
        }

        [HttpPost("{recupeId}/step/{step}")]
        public async Task<IActionResult> AddRecipeStep(long recupeId, string step)
        {
            var result = await _mealManager.AddRecipeStep(recupeId, step);

            return Ok(result);
        }

        [HttpPatch("{recupeId}/step/{stepId}/{step}")]
        public async Task<IActionResult> UpdateRecipeStep(long recupeId, long stepId, string step)
        {
            var result = await _mealManager.UpdateRecipeStep(recupeId, stepId, step);

            return Ok(result);
        }

        [HttpDelete("{recupeId}/step/{stepId}")]
        public async Task<IActionResult> DeleteRecipeStep(long recupeId, long stepId)
        {
            var result = await _mealManager.RemvoeRecipeStep(recupeId, stepId);

            return Ok(result);
        }

        [HttpDelete("{id}/category/{category}")]
        public async Task<IActionResult> RemoveRecipeCategory(long id, long category)
        {
            var result = await _mealManager.RemoveRecipeCategory(id, category);

            return Ok(result);
        }
    }
}
