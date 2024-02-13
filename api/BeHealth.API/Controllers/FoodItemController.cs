using AutoWrapper.Wrappers;
using BeHealth.Business.Managers;
using BeHealth.Business.Models.FoodManamgnet.FoodItems;
using BeHealth.Business.Resources.FoodManamgnet.FoodItems;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.Swagger.Annotations;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace BeHealth.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FoodItemController : ControllerBase
    {
        private readonly IItemManager _itemManager;
        public FoodItemController(
            IItemManager itemManager
            )
        {
            _itemManager = itemManager;
        }

        /// <summary>
        /// Get all items in the system including the nutritional value of each item
        /// </summary>
        /// <returns>List of items resource</returns>
        /// <responses code="404">kfghe</responses>
        [Produces(typeof(List<FoodItemResource>))]
        [HttpGet]
        public async Task<ApiResponse> GetItems([FromQuery] string name)
        {
            var result = await _itemManager.GetAllItems(name);

            return new ApiResponse("Success", result, 200);
        }

        /// <summary>
        /// Add a new item to the system
        /// </summary>
        /// <param name="model">ItemModel: contains the required information for creating a new item</param>
        [SwaggerResponse(HttpStatusCode.BadRequest, Description = "Test")]
        [Produces(typeof(FoodItemResource))]
        [HttpPost]
        public async Task<ApiResponse> PostItem(FoodItemModel model)
        {
            var result = await _itemManager.CreateNewItem(model);

            return new ApiResponse("New food item has been created in the datanase", result, 201);

        }

        [HttpPut("{id}")]
        public async Task<ApiResponse> PutItem(long id, FoodItemModel model)
        {
            var result = await _itemManager.UpdateItem(id, model);

            return new ApiResponse("Food item has been updated in the datanase", result, 201);
        }

        [HttpDelete("{id}")]
        public async Task<ApiResponse> DeleteItem(long id)
        {
            var result = await _itemManager.DeleteItem(id);

            return new ApiResponse("Food item has been deleted from the datanase", result, 200);
        }

    }
}
