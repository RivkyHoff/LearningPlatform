using System.Collections.Generic;

namespace Dal.Models;

public class SubCategory
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }

    public virtual Category Category { get; set; }
    public virtual ICollection<Prompt> Prompts { get; set; } = new List<Prompt>();
}