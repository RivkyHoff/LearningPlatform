using Bl.Interfaces;
using Bl.Services;
using Dal.Models;
using Dal.Repositories;
using System;

namespace Bl.Services
{
    public class UserService : IUserService
    {
        private readonly UserRepository _userRepository;

        public UserService(UserRepository userRepository)
        {
            _userRepository = userRepository;
        }

      
        public void RegisterUser(User user)
        {
            try
            {
               
                if (_userRepository.GetUserByPhone(user.Phone) != null)
                {
                    throw new ApplicationException("User with this phone already exists.");
                }

                user.Id = 0; 
                _userRepository.CreateUser(user);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error occured while creating new user.", ex);
            }
        }


        public bool UserExists(User user)
        {
            try
            {
                return _userRepository.UserExists(user);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error while checking user existence.", ex);
            }
        }



        public List<string> GetResponsesByUserId(int userId)
        {
            try
            {
                return _userRepository.GetResponsesByUserId(userId);
            }
            catch (Exception ex)
            {
                throw new ApplicationException("\r\nError retrieving user comments.", ex);
            }
        }
    }
}
