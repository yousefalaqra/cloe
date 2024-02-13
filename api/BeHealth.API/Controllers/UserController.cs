using BeHealth.API.Configuration.JwtToken;
using BeHealth.Business.Managers;
using BeHealth.Business.Models;
using BeHealth.Business.Models.Users;
using BeHealth.Business.Resources;
using BeHealth.Business.Resources.Users;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BeHealth.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserManager _userManager;
        private readonly IJwtTokenFactory _tokenHandler;

        public UserController(
            IUserManager userManager,
            IJwtTokenFactory tokenHandler)
        {
            _userManager = userManager;
            _tokenHandler = tokenHandler;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            IEnumerable<UserResource> result = _userManager.GetUsers();

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(long id)
        {
            UserResource result = await _userManager.GetUser(id);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(long id, UserRegistrationModel model)
        {
            UserResource result = await _userManager.Update(id, model);

            return Created(nameof(UpdateUser), result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            bool result = await _userManager.Delete(id);

            return Ok(result);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(UserRegistrationModel model)
        {
            UserResource result = await _userManager.Register(model);

            return Created(nameof(RegisterUser), result);
        }

        [HttpPost()]
        public async Task<IActionResult> Login(UserLoginModel model)
        {
            UserResource result = await _userManager.Login(model);

            string token = _tokenHandler.GenerateJWTToken(result);

            return Ok(new
            {
                User = result,
                Token = token
            });
        }

        [HttpPut()]
        public async Task<IActionResult> LoginClient(UserLoginModel model)
        {
            var result = await _userManager.LoginClient(model);

            UserResource resource = new UserResource
            {
                DateOfBirth = result.BirthDate,
                EmailAddress = result.ClientId,
                FirstName = result.FullName,
                ID = result.Dues.Count,
                LastName = result.FullName,
                PhoneNumber = result.PhoneNumber,
                Username = result.ClientId,
                UserType = Presentence.Enums.UserTypesEnum.User,
            };

            string token = _tokenHandler.GenerateJWTToken(resource);

            return Ok(new
            {
                User = result,
                Token = token
            });
        }

    }
}
