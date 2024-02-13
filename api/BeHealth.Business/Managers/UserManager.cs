using AutoMapper;
using BeHealth.Business.Error;
using BeHealth.Business.Models;
using BeHealth.Business.Models.Users;
using BeHealth.Business.Resources;
using BeHealth.Business.Resources.Clinets;
using BeHealth.Business.Resources.Users;
using BeHealth.Presentence.Entities;
using BeHealth.Presentence.Entities.Organization;
using BeHealth.Presentence.Respositories;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BeHealth.Business.Managers
{
    public interface IUserManager
    {
        IEnumerable<UserResource> GetUsers();

        Task<UserResource> GetUser(long id);

        Task<UserResource> Register(UserRegistrationModel model);

        Task<UserResource> Login(UserLoginModel model);
        Task<ClientResource> LoginClient(UserLoginModel model);

        Task<UserResource> Update(long id, UserRegistrationModel model);

        Task<bool> Delete(long id);
    }
    public class UserManager : IUserManager
    {
        private readonly IRepository<UserEntity> _userRepository;
        private readonly IClientManager _clientManager;
        private readonly IRepository<ClientEntity> _clientRepository;
        private readonly IMapper _mapper;

        public UserManager(
            IRepository<UserEntity> userRepository,
            IRepository<ClientEntity> clientRepository,
            IClientManager clientManager,
            IMapper mapper
            )
        {
            _userRepository = userRepository;
            _clientRepository = clientRepository;
            _mapper = mapper;
            _clientManager = clientManager;
        }

        public IEnumerable<UserResource> GetUsers()
        {
            IEnumerable<UserEntity> userEntities = _userRepository.GetAll();

            IEnumerable<UserResource> result = _mapper.Map<IEnumerable<UserResource>>(userEntities);

            return result;
        }

        public async Task<UserResource> GetUser(long id)
        {
            UserEntity userEntity = await _userRepository.GetById(id);

            UserResource result = _mapper.Map<UserResource>(userEntity);

            return result;
        }

        public async Task<UserResource> Login(UserLoginModel model)
        {

            if (string.IsNullOrEmpty(model.Password))
                throw new Exception("Password is required");

            if (string.IsNullOrEmpty(model.Password) && string.IsNullOrEmpty(model.EmailAddress))
            {
                throw new Exception("Email or username are required");
            }

            UserEntity entity = await _userRepository.FirstOrDefault(
                x =>
                x.EmailAddress.Equals(model.EmailAddress));

            if (entity == null)
            {
                throw new HttpStatusException(HttpStatusCode.BadRequest, $"Insrted username: {model.Username}, is not valid ");
            }


            // check if password is correct
            if (!VerifyPasswordHash(model.Password, entity.PasswordHash, entity.PasswordSalt))
                throw new HttpStatusException(HttpStatusCode.BadRequest, $"Insrted password: {model.Password}, is not valid");

            UserResource result = new UserResource
            {
                DateOfBirth = entity.BirthDate,
                EmailAddress = entity.EmailAddress,
                FirstName = entity.EmailAddress,
                ID = entity.ID,
                LastName = entity.FullName,
                Username = entity.EmailAddress,
                PhoneNumber = entity.PhoneNumber,
                UserType = Presentence.Enums.UserTypesEnum.Admin
            };

            // authentication successful
            return result;
        }

        public async Task<UserResource> Register(UserRegistrationModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Password))
                throw new HttpStatusException(HttpStatusCode.BadRequest, $"Password is requird!");

            UserEntity entity = new UserEntity
            {
                EmailAddress = model.EmailAddress,
                PhoneNumber = model.PhoneNumber,
                BirthDate = model.DateOfBirth,
                FullName = $"{model.FirstName} {model.LastName}",
                CreatedAt = DateTime.Now,
                CreatedBy = "Jo",

            };

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);

            entity.PasswordHash = passwordHash;
            entity.PasswordSalt = passwordSalt;

            UserEntity createdEntity = _userRepository.Add(entity);
            await _userRepository.SaveChangesAsync();

            UserResource result = _mapper.Map<UserResource>(createdEntity);

            return result;
        }

        public async Task<bool> IsUserNameValid(string userName)
        {

            UserEntity userEntity = await _userRepository.FirstOrDefault(x => x.EmailAddress == userName);

            if (userEntity == null)
            {
                throw new Exception("Invalid Operation");
            }

            return true;
        }

        public async Task<bool> IsUserEmailValid(string userEmail)
        {

            UserEntity userEntity = await _userRepository.FirstOrDefault(x => x.EmailAddress == userEmail);

            if (userEntity == null)
            {
                throw new Exception("Invalid Operation");
            }

            return true;
        }


        public async Task<UserResource> Update(long id, UserRegistrationModel model)
        {
            UserEntity userEntity = await _userRepository.GetById(id);

            if (userEntity == null)
            {
                throw new Exception("Invalid Operation");
            }

            userEntity.EmailAddress = model.EmailAddress;
            userEntity.PhoneNumber = model.PhoneNumber;

            _userRepository.Update(userEntity);
            await _userRepository.SaveChangesAsync();

            UserResource result = _mapper.Map<UserResource>(userEntity);

            return result;
        }

        public async Task<bool> Delete(long id)
        {
            UserEntity userEntity = await _userRepository.GetById(id);

            if (userEntity == null)
            {
                throw new Exception("Invalid Operation");
            }

            _userRepository.Remove(userEntity);
            await _userRepository.SaveChangesAsync();

            return true;
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }


        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public async Task<ClientResource> LoginClient(UserLoginModel model)
        {
            var entity = await _clientRepository.FirstOrDefault(x => x.Username == model.EmailAddress && x.Password == model.Password);

            if (entity == null)
                throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            return await _clientManager.GetClientById(entity.clientId);
        }
    }
}
