using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Dal.Models;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<Prompt> Prompts { get; set; }

    public virtual DbSet<SubCategory> SubCategories { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\\משתמש\\Documents\\הנדסאים\\2nd year\\server\\LearningPlatform\\Dal\\Database\\LearningPlatform.mdf;Integrated Security=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3214EC070D785CB1");
        });

        modelBuilder.Entity<Prompt>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Prompts__3214EC07F6562DF6");

            entity.Property(e => e.CreatedAt).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.Category).WithMany(p => p.Prompts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Prompts__Categor__2C3393D0");

            entity.HasOne(d => d.SubCategory).WithMany(p => p.Prompts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Prompts__SubCate__2D27B809");

            entity.HasOne(d => d.User).WithMany(p => p.Prompts)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Prompts__UserId__2B3F6F97");
        });

        modelBuilder.Entity<SubCategory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SubCateg__3214EC0750A80E77");

            entity.HasOne(d => d.Category).WithMany(p => p.SubCategories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SubCatego__Categ__2E1BDC42");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07ED8E1381");
        });
        // added seed data here!
        modelBuilder.Entity<Category>().HasData(
           new Category { Id = 1, Name = "Math" },
           new Category { Id = 2, Name = "Science" },
           new Category { Id = 3, Name = "English" }
       );

        modelBuilder.Entity<User>().HasData(
            new User { Id = 1, Name = "Alice", Phone = "0501234567" },
            new User { Id = 2, Name = "Rivkah", Phone = "0527654321" }
        );

        modelBuilder.Entity<SubCategory>().HasData(
            new SubCategory { Id = 1, Name = "Algebra", CategoryId = 1 },
            new SubCategory { Id = 2, Name = "Physics", CategoryId = 2 },
            new SubCategory { Id = 3, Name = "Lirerature", CategoryId = 2 }
        );

        modelBuilder.Entity<Prompt>().HasData(
            new Prompt { Id = 1, UserId = 1, CategoryId = 1, SubCategoryId = 1, Prompt_a = "What is 2+2?", Response = "4" },
            new Prompt { Id = 2, UserId = 2, CategoryId = 2, SubCategoryId = 2, Prompt_a = "What is gravity?", Response = "A force attracting two bodies." }
        );
        //
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
