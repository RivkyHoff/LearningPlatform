using Bl.Interfaces;
using Bl.Services;
using Dal.Models;
using Dal.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly SubCategoryRepository _subCategoryRepository;

        public SubCategoryService(SubCategoryRepository subCategoryRepository)
        {
            _subCategoryRepository = subCategoryRepository;
        }

        public IEnumerable<SubCategory> GetAllSubCategories()
        {
            return _subCategoryRepository.GetAllSubCategories();
        }

        public async Task<string?> GetSubCategoryNameByIdAsync(int subCategoryId)
        {
            return await _subCategoryRepository.GetSubCategoryNameByIdAsync(subCategoryId);
        }
    }
}
