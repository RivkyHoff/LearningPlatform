using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dal.Models;

public partial class Prompt
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int CategoryId { get; set; }
    public int SubCategoryId { get; set; }

    [Column("Prompt")]
    public string Prompt_a { get; set; } = null!;

    public string? Response { get; set; }
    public DateTime CreatedAt { get; set; }

    //public virtual Category Category { get; set; } = null!;
    //public virtual SubCategory SubCategory { get; set; } = null!;
    //public virtual User User { get; set; } = null!;
    public virtual Category? Category { get; set; }
    public virtual SubCategory? SubCategory { get; set; }
    public virtual User? User { get; set; }
}