using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Repositories
{
    public class UserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public User GetUser(int userId)
        {
            return _context.Set<User>().FirstOrDefault(u => u.Id == userId);
        }
        public void CreateUser(User user)
        {
            _context.Set<User>().Add(user);
            _context.SaveChanges();
        }
        public User? GetUserByPhone(string phone)
        {
            return _context.Users.FirstOrDefault(u => u.Phone == phone);
        }

        public bool UserExists(User user)
        {
            try
            {
                return _context.Users.Any(u => u.Id == user.Id);
            }
            catch (Exception ex)
            {

                Console.WriteLine($"An error occurred: {ex.Message}");
                return false;
            }
        }
        public List<string> GetResponsesByUserId(int userId)
        {
            var responses = new List<string>();
            var prompts = _context.Prompts.ToList();

            foreach (var prompt in prompts)
            {
                if (prompt.UserId == userId)
                {
                    responses.Add(prompt.Response);
                }
            }

            return responses;
        }

    }
}

