using BeHealth.Business.Managers;
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
    public class WorkplaceController : ControllerBase
    {
        private readonly IWrokplaceManager _workplaceManager;

        public WorkplaceController(IWrokplaceManager workplaceManager)
        {
            _workplaceManager = workplaceManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetWorkplaces()
        {
            var result = await _workplaceManager.GetWorkplaces();

            return Ok(result);
        }
    }
}
