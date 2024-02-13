using BeHealth.Business.Managers;
using BeHealth.Business.Models.Location;
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
    public class LocationController : ControllerBase
    {
        private readonly ILocationManager _locationManager;

        public LocationController(ILocationManager locationManager)
        {
            _locationManager = locationManager;
        }

        [HttpGet("Governorat")]
        public async Task<IActionResult> GetGovernorates()
        {
            return Ok(await _locationManager.GetGovernorates());
        }

        [HttpPost("Governorat")]
        public async Task<IActionResult> CreateGovernorates(GovernorateModel model)
        {
            return Created(nameof(CreateGovernorates), await _locationManager.CreateGovernorate(model));
        }

        [HttpPut("Governorat/{id}")]
        public async Task<IActionResult> UpdateGovernorates(long id, GovernorateModel model)
        {
            return Created(nameof(UpdateGovernorates), await _locationManager.UpdateGovernorate(id, model));
        }

        [HttpDelete("Governorat/{id}")]
        public async Task<IActionResult> DeleteGovernorates(long id)
        {
            return Ok(await _locationManager.DeleteGovernorates(id));
        }
    }
}
