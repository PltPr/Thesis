using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace api.Data
{
    public class ApplicationDBContext :IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }

        public DbSet<JobOffer> JobOffer {get;set;}
        public DbSet<Technology> Technology {get;set;}
        public DbSet<JobOfferTechnology> JobOfferTechnology {get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<JobOfferTechnology>(x=>x.HasKey(jot=>new{jot.JobOfferId,jot.TechnologyId}));

            modelBuilder.Entity<JobOfferTechnology>()
                .HasOne(jot=>jot.JobOffer)
                .WithMany(u=>u.JobOfferTechnology)
                .HasForeignKey(jot=>jot.JobOfferId);

            modelBuilder.Entity<JobOfferTechnology>()
                .HasOne(jot=>jot.Technology)
                .WithMany()
                .HasForeignKey(jot=>jot.TechnologyId);
        }
    }
}