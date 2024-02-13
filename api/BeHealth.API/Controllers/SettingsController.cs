using BeHealth.Business.Managers;
using BeHealth.Business.Models;
using BeHealth.Business.Models.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BeHealth.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly IUnitManager _unitManager;
        private readonly ITypeManager _typeManager;

        public SettingsController(
            IUnitManager unitManager,
            ITypeManager typeManager

            )
        {
            _unitManager = unitManager;
            _typeManager = typeManager;
        }

        #region GET Methods:



        [HttpGet("Units")]
        public async Task<IActionResult> GetUnits()
        {
            return Ok(await _unitManager.GetAllUnits());
        }

        [HttpGet("Types")]
        public async Task<IActionResult> GetTypes([FromQuery] TypesFilterModel filter)
        {
            return Ok(await _typeManager.GetTypes(filter));
        }

        #endregion

        #region POST Methods:
        

        [HttpPost("Units")]
        public async Task<IActionResult> CreateUnits(UnitModel model)
        {
            return Created(nameof(CreateUnits), await _unitManager.CreateUnit(model));
        }

        [HttpPost("Types")]
        public async Task<IActionResult> CreateType(TypeModel model)
        {
            return Created(nameof(CreateType), await _typeManager.CreateType(model));
        }

        #endregion

        #region PUT Methods:


        [HttpPut("Units/{id}")]
        public async Task<IActionResult> UpdateUnits(long id, UnitModel model)
        {
            return Created(nameof(UpdateUnits), await _unitManager.UpdateUnit(id, model));
        }

        [HttpPut("Types/{id}")]
        public async Task<IActionResult> UpdateTypes(long id, TypeModel model)
        {
            return Created(nameof(UpdateTypes), await _typeManager.UpdateType(id, model));
        }
        #endregion

        #region DELETE Methods:


        [HttpDelete("Units/{id}")]
        public async Task<IActionResult> DeleteUnits(long id)
        {
            return Ok(await _unitManager.DeleteUnit(id));
        }

        [HttpDelete("Types/{id}")]
        public async Task<IActionResult> DeleteTypes(long id)
        {
            return Ok(await _typeManager.DeleteType(id));
        }

        #endregion
    }
}
