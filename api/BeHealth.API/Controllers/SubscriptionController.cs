using BeHealth.Business.Managers;
using BeHealth.Business.Models.Subscription;
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
    public class SubscriptionController : ControllerBase
    {
        private readonly ISubscriptionManager _manager;

        public SubscriptionController(ISubscriptionManager manager)
        {
            _manager = manager;
        }

        [HttpGet]
        public async Task<IActionResult> GetSubscriptions([FromQuery] bool active)
        {
            return Ok(await _manager.GetAllSubscritions(active));
        }

        [HttpGet("income")]
        public async Task<IActionResult> GetIncome()
        {
            return Ok(await _manager.GetIncome());
        }


        [HttpPost]
        public async Task<IActionResult> PostSubscription(SubscriptionModel model)
        {
            return Created(nameof(PostSubscription), await _manager.AddSubscription(model));
        }

        [HttpPatch("{subId}")]
        public async Task<IActionResult> UpdateStatus(long subId)
        {
            return Created(nameof(PostSubscription), await _manager.UpdateSubscruotionState(subId));
        }


        [HttpPut("Attach/{clientId}/{subId}")]
        public async Task<IActionResult> AttachClientSubs(long clientId, long subId)
        {
            return Created(nameof(PostSubscription), await _manager.AttachClientSub(clientId, subId));
        }


        


    }
}
