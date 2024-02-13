using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeHealth.Business.Managers;
using BeHealth.Business.Models.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BeHealth.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UnitController : ControllerBase
    {
        private readonly IUnitManager _manager;

        public UnitController(
            IUnitManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<IActionResult> GetUnits()
        {
            var result = await _manager.GetAllUnits();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> PostUnit(UnitModel model)
        {
            var result = await _manager.CreateUnit(model);

            return Created(nameof(PostUnit), result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUnit(long id, UnitModel model)
        {
            var result = await _manager.UpdateUnit(id, model);

            return Created(nameof(PutUnit), result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUnit(long id)
        {
            var result = await _manager.DeleteUnit(id);

            return Ok(result);
        }
    }
}
