using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeHealth.Business.Managers;
using BeHealth.Business.Models;
using BeHealth.Business.Models.Clients;
using BeHealth.Business.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BeHealth.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {

        private readonly ILogger<ClientController> _logger;
        private readonly IClientManager _manager;

        public ClientController(
            ILogger<ClientController> logger,
            IClientManager manager)
        {
            _logger = logger;
            _manager = manager;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(string id)
        {
            var result = await _manager.GetClientById(id);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Add(ClientModel model)
        {
            var result = await _manager.AddClient(model);

            return Created(nameof(Add), result);
        }

        [HttpPatch("{id}/{tag}")]
        public async Task<IActionResult> AddTag(string id, string tag)
        {
            var result = await _manager.AddClientTag(id, tag);

            return Created(nameof(Add), result);
        }

        [HttpPatch("{id}/disease/{disease}")]
        public async Task<IActionResult> AddDisease(string id, string disease)
        {
            var result = await _manager.AddClientDisease(id, disease);

            return Created(nameof(AddDisease), result);
        }

        [HttpDelete("{id}/{tagId}")]
        public async Task<IActionResult> DeleteTag(string id, long tagId)
        {
            var result = await _manager.DeleteClientTag(id, tagId);

            return Created(nameof(Add), result);
        }

        [HttpDelete("{id}/disease/{diseaseId}")]
        public async Task<IActionResult> DeleteDisease(string id, long diseaseId)
        {
            var result = await _manager.DeleteClientDisease(id, diseaseId);

            return Created(nameof(Add), result);
        }

        [HttpPatch("{id}/medication/{medication}")]
        public async Task<IActionResult> AddMedication(string id, string medication)
        {
            var result = await _manager.AddClientMedication(id, medication);

            return Created(nameof(AddMedication), result);
        }

        [HttpDelete("{id}/medication/{medicationId}")]
        public async Task<IActionResult> DeleteMedication(string id, long medicationId)
        {
            var result = await _manager.DeleteClientMedication(id, medicationId);

            return Created(nameof(DeleteDisease), result);
        }

        [HttpPatch("{id}/observation")]
        public async Task<IActionResult> AddObservation(string id, ClientObservationModel model)
        {
            var result = await _manager.AddClientObservation(id, model);

            return Created(nameof(AddMedication), result);
        }

        [HttpPatch("{id}/observation/{observationId}")]
        public async Task<IActionResult> UpdateObservation(string id, long observationId, ClientObservationModel model)
        {
            var result = await _manager.UpdateClientObservation(id, observationId, model);

            return Created(nameof(AddMedication), result);
        }

        [HttpDelete("{id}/observation/{observationId}")]
        public async Task<IActionResult> DeleteObservation(string id, long observationId)
        {
            var result = await _manager.DeleteClientObservation(id, observationId);

            return Created(nameof(AddMedication), result);
        }


        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] long workplaceId, [FromQuery] string searchKey)
        {
            var result = await _manager.GetAll(workplaceId, searchKey);

            return Created(nameof(GetAll), result);
        }

        [HttpGet("ValidNumber/{number}")]
        public async Task<IActionResult> CheckPhoneNumber(string number)
        {
            var result = await _manager.ValidatePhoneNumber(number);

            return Created(nameof(GetAll), result);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(string id, ClientModel model)
        {
            var result = await _manager.UpdateClient(id, model);

            return Created(nameof(UpdateClient), result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletetClient(string id)
        {
            var result = await _manager.DeleteClient(id);

            return Ok(result);
        }


        [HttpPost("{id}/measurement")]
        public async Task<IActionResult> AddMesasurement(string id, ClientMeasurementModel model)
        {
            var result = await _manager.AddClientMeasurements(id, model);

            return Created(nameof(AddMesasurement), result);
        }

        [HttpPut("{id}/measurement/{measurementId}")]
        public async Task<IActionResult> UpdateMesasurement(string id, long measurementId, ClientMeasurementModel model)
        {
            var result = await _manager.UpdateClientMeasurements(id, measurementId, model);

            return Created(nameof(UpdateMesasurement), result);
        }

        [HttpDelete("{id}/measurement/{measurementId}")]
        public async Task<IActionResult> DeleteMesasurement(string id, long measurementId)
        {
            var result = await _manager.DeleteClientMeasurements(id, measurementId);

            return Created(nameof(UpdateMesasurement), result);
        }

        [HttpPost("subscription/{id}/{subId}")]
        public async Task<IActionResult> AddSubscription(string id, long subId)
        {
            var result = await _manager.AddClientSubscription(id, subId);

            return Created(nameof(AddSubscription), result);
        }

        [HttpPatch("{id}/subscription/{subId}/{csId}")]
        public async Task<IActionResult> PuaseClientSubscription(string id, long subId, long csId)
        {
            var result = await _manager.PuauseClientSubscription(id, subId, csId);

            return Created(nameof(UpdateMesasurement), result);
        }

        [HttpDelete("subscription/{id}/{csId}")]
        public async Task<IActionResult> DeleteSubscription(string id, long csId)
        {
            var result = await _manager.DeleteClientSubscriptions(id, csId);

            return Created(nameof(UpdateMesasurement), result);
        }

        [HttpPost("payment/{id}")]
        public async Task<IActionResult> AddPayment(string id, PaymentModel model)
        {
            var result = await _manager.AddClientPayment(id, model);

            return Created(nameof(AddSubscription), result);
        }

        [HttpPatch("payment/{id}/{paymentId}/")]
        public async Task<IActionResult> UpdateClientPayment(string id, long paymentId, PaymentModel model)
        {
            var result = await _manager.UpdateClientPayment(id, paymentId, model);

            return Created(nameof(UpdateMesasurement), result);
        }

        [HttpDelete("payment/{id}/{paymentId}/")]
        public async Task<IActionResult> DeleteClientPayment(string id, long paymentId)
        {
            var result = await _manager.deleteClientPayment(id, paymentId);


            return Created(nameof(UpdateMesasurement), result);

        }
    }
}
