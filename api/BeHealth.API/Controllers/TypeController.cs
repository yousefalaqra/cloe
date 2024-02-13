using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeHealth.Business.Managers;
using BeHealth.Business.Models;
using BeHealth.Business.Models.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeHealth.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TypeController : ControllerBase
    {
        private readonly ITypeManager _manager;

        public TypeController(
            ITypeManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<IActionResult> GetTypes([FromQuery]TypesFilterModel filter)
        {
            var result = await _manager.GetTypes(filter);

            return Ok(result);
        }


        [HttpPost]
        public async Task<IActionResult> PostType(TypeModel model)
        {
            var result = await _manager.CreateType(model);

            return Created(nameof(PostType), result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutType(long id, TypeModel model)
        {
            var result = await _manager.UpdateType(id, model);

            return Created(nameof(PutType), result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteType(long id)
        {
            var result = await _manager.DeleteType(id);

            return Ok(result);
        }
    }
}
