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
    public class ApplicationDBContext :IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }

        public DbSet<JobOffer> JobOffers {get;set;}
        public DbSet<Technology> Technologies {get;set;}
        public DbSet<JobOfferTechnologyRequired> JobOfferTechnologiesRequired {get;set;}
        public DbSet<JobOfferTechnologyNiceToHave> JobOfferTechnologiesNiceToHave {get;set;}
        public DbSet<Application> Applications {get;set;}
        public DbSet<CV> CVs {get;set;}

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