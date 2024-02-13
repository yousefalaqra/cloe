using BeHealth.Business.Managers;
using BeHealth.Business.Models.DietPlan;
using BeHealth.Business.Models.FoodManamgnet.FoodItems;
using BeHealth.Business.Models.FoodManamgnet.Meals;
using BeHealth.Business.Models.FoodManamgnet.Templates;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace BeHealth.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TemplateController : ControllerBase
    {
        private readonly ITemplateManager _templateManager;
        public TemplateController(
            ITemplateManager templateManager
            )
        {
            _templateManager = templateManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string name, [FromQuery] bool clientId)
        {

            var result = await _templateManager.GetAllTemplate(name, clientId);

            return Created(nameof(GetAll), result);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {

            var result = await _templateManager.GetDietByID(id);

            return Created(nameof(GetById), result);

        }

        [HttpPost]
        public async Task<IActionResult> Create(TemplateModel model)
        {
            var result = await _templateManager.CreateNewTemplate(model);

            return Created(nameof(Create), result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, TemplateModel model)
        {
            var result = await _templateManager.UpdateTemplate(id, model);

            return Created(nameof(Update), result);
        }   
        
        [HttpGet("NutritionValue/{id}")]
        public async Task<IActionResult> GetNutritionValue(long id)
        {
            var result = await _templateManager.GetNutritionValue(id);

            return Created(nameof(Update), result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(long id)
        {
            var result = await _templateManager.RemoveTemplate(id);

            return Created(nameof(Remove), result);
        }

        [HttpPost("meals/{id}")]
        public async Task<IActionResult> CreateMeal(long id, MealsModel model)
        {
            var result = await _templateManager.AddPlanMeal(id, model);

            return Created(nameof(Create), result);
        }


        [HttpPut("meals/{mealId}")]
        public async Task<IActionResult> UpdateMeal(long mealId, MealsModel model)
        {
            var result = await _templateManager.UpdatePlanMeal(mealId, model);

            return Created(nameof(Update), result);
        }

        [HttpDelete("meals/{mealId}")]
        public async Task<IActionResult> RemoveMeal(long mealId)
        {
            var result = await _templateManager.DeletePlanMeal(mealId);

            return Created(nameof(Remove), result);
        }


        [HttpPost("recipe/{mealId}/{recipeId}")]
        public async Task<IActionResult> CreateMealRecipe(long mealId, long recipeId, RecipeModel model)
        {
            var result = await _templateManager.AddMealRecipe(mealId, recipeId, model);

            return Created(nameof(CreateMealRecipe), result);
        }

        [HttpDelete("recipe/{mealId}/{recipeId}")]
        public async Task<IActionResult> DeleteMealRecipe(long mealId, long recipeId)
        {
            var result = await _templateManager.DeleteMealRecipe(mealId, recipeId);

            return Created(nameof(DeleteMealRecipe), result);
        }

        [HttpPost("item/{mealId}/{itemId}")]
        public async Task<IActionResult> CreateMealItem(long mealId, long itemId, FoodItemModel model)
        {
            var result = await _templateManager.AddMealFoodItem(mealId, itemId, model);

            return Created(nameof(CreateMealItem), result);
        }   
        
        [HttpPut("item/{mealId}/{itemId}")]
        public async Task<IActionResult> UpdateMealItem(long mealId, long itemId, FoodItemModel model)
        {
            var result = await _templateManager.UpdateMealFoodItem(mealId, itemId, model);

            return Created(nameof(CreateMealItem), result);
        }  
        
        [HttpDelete("item/{mealId}/{itemId}")]
        public async Task<IActionResult> DeleteMealItem(long mealId, long itemId)
        {
            var result = await _templateManager.DeleteMealFoodItem(mealId, itemId);

            return Created(nameof(CreateMealItem), result);
        }
    }
}
