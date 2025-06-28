using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;

namespace Dal.Repositories
{
    public class PromptRepository
    {
        private readonly AppDbContext _context;

        public PromptRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreatePrompt(Prompt prompt)
        {
            try
            {
                if (prompt.Category != null) prompt.Category = null;
                if (prompt.SubCategory != null) prompt.SubCategory = null;
                if (prompt.User != null) prompt.User = null;

                _context.Prompts.Add(prompt);
                _context.SaveChanges();
            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine("Database save error: " + dbEx.Message);
                throw;
            }
            catch (Exception ex)
            {
                Console.WriteLine("General error: " + ex.Message);
                throw;
            }
        }



    }

}

