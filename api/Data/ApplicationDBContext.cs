using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Build.Framework;
using Microsoft.EntityFrameworkCore;


namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }

        public DbSet<JobOffer> JobOffers { get; set; }
        public DbSet<Technology> Technologies { get; set; }
        public DbSet<JobOfferTechnologyRequired> JobOfferTechnologiesRequired { get; set; }
        public DbSet<JobOfferTechnologyNiceToHave> JobOfferTechnologiesNiceToHave { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<CV> CVs { get; set; }
        public DbSet<TestTask> TestTasks { get; set; }
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<Test> Tests { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<CodeSubmission> CodeSubmissions { get; set; }
        public DbSet<ApplicationEvaluation> ApplicationEvaluations { get; set; }
        


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<JobOfferTechnologyRequired>(x => x.HasKey(jot => new { jot.JobOfferId, jot.TechnologyIdRequired }));

            modelBuilder.Entity<JobOfferTechnologyRequired>()
                .HasOne(jot => jot.JobOffer)
                .WithMany(u => u.JobOfferTechnologyRequired)
                .HasForeignKey(jot => jot.JobOfferId);

            modelBuilder.Entity<JobOfferTechnologyRequired>()
                .HasOne(jot => jot.Technology)
                .WithMany()
                .HasForeignKey(jot => jot.TechnologyIdRequired);


            modelBuilder.Entity<JobOfferTechnologyNiceToHave>(x => x.HasKey(jot => new { jot.JobOfferId, jot.TechnologyIdNiceToHave }));

            modelBuilder.Entity<JobOfferTechnologyNiceToHave>()
                .HasOne(jot => jot.JobOffer)
                .WithMany(u => u.JobOfferTechnologyNiceToHave)
                .HasForeignKey(jot => jot.JobOfferId);

            modelBuilder.Entity<JobOfferTechnologyNiceToHave>()
                .HasOne(jot => jot.Technology)
                .WithMany()
                .HasForeignKey(jot => jot.TechnologyIdNiceToHave);


            modelBuilder.Entity<TestTask>(x => x.HasKey(tt => new { tt.TestId, tt.TaskId }));

            modelBuilder.Entity<TestTask>()
                .HasOne(ts => ts.Test)
                .WithMany(u => u.TestTasks)
                .HasForeignKey(ts => ts.TestId);

            modelBuilder.Entity<TestTask>()
                .HasOne(ts => ts.Task)
                .WithMany()
                .HasForeignKey(ts => ts.TaskId);

            modelBuilder.Entity<Note>()
                .HasOne(n => n.Application)
                .WithMany(a => a.Notes)
                .HasForeignKey(n => n.ApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Note>()
                .HasOne(n => n.Adder)
                .WithMany()
                .HasForeignKey(n => n.AdderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Application)
                .WithMany(a => a.Messages)
                .HasForeignKey(m => m.ApplicationId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Adder)
                .WithMany()
                .HasForeignKey(m => m.AdderId)
                .OnDelete(DeleteBehavior.Restrict);




            List<IdentityRole> roles = new List<IdentityRole>
                {
                    new IdentityRole
                    {
                        Id="Admin",
                        Name="Admin",
                        NormalizedName="ADMIN"
                    },
                    new IdentityRole
                    {
                        Id="User",
                        Name="User",
                        NormalizedName="USER"
                    },
                    new IdentityRole
                    {
                        Id="Examiner",
                        Name="Examiner",
                        NormalizedName="EXAMINER"
                    }
                };
            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}