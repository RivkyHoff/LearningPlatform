using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Interfaces
{
    public interface IPromptService
    {
        public Task<string> SubmitPrompt(Prompt prompt);

    }
}
