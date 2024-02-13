using BeHealth.Business.Managers;
using BeHealth.Business.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
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
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentManager _manager;

        public AppointmentController(IAppointmentManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int time)
        {
            return Ok(await _manager.GetAll(time));
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> CreateAppointment(string id, AppointmentModel model)
        {
            var result = await _manager.AddAppointment(id, model);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(long id, AppointmentModel model)
        {
            var result = await _manager.UpdateAppointment(id, model);
            return Created(nameof(Update), result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var result = await _manager.DeleteAppointment(id);
            return Created(nameof(Delete), result);
        }
    }
}
    