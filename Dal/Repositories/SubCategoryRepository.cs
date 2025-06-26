using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Repositories
{
    public class SubCategoryRepository
    {
        private readonly AppDbContext _context;

        public SubCategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<SubCategory> GetAllSubCategories()
        {
            return _context.SubCategories.Include(sc => sc.Category).ToList();
        }

        public async Task<string?> GetSubCategoryNameByIdAsync(int subCategoryId)
        {
            var subCategory = await _context.SubCategories
                .Where(sc => sc.Id == subCategoryId)
                .Select(sc => sc.Name)
                .FirstOrDefaultAsync();

            return subCategory; 
        }
    }
}
