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
        public DbSet<JobOfferTechnology> JobOfferTechnologies {get;set;}
        public DbSet<Application> Applications {get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<JobOfferTechnology>(x => x.HasKey(jot => new { jot.JobOfferId, jot.TechnologyId }));

            modelBuilder.Entity<JobOfferTechnology>()
                .HasOne(jot => jot.JobOffer)
                .WithMany(u => u.JobOfferTechnology)
                .HasForeignKey(jot => jot.JobOfferId);

            modelBuilder.Entity<JobOfferTechnology>()
                .HasOne(jot => jot.Technology)
                .WithMany()
                .HasForeignKey(jot => jot.TechnologyId);



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