using System.Linq;
using api.Models;

namespace api.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(ApplicationDBContext context)
        {
            if (!context.Technologies.Any())
            {
                var technologies = new[]
                {
                    new Technology { Name = "C#" },
                    new Technology { Name = "JavaScript" },
                    new Technology { Name = "React" },
                    new Technology { Name = "Node.js" },
                    new Technology { Name = "Python" },
                    new Technology { Name = "Java" },
                    new Technology { Name = "SQL" },
                    new Technology { Name = "Docker" },
                    new Technology { Name = "AWS" },
                    new Technology { Name = "HTML/CSS" }
                };

                context.Technologies.AddRange(technologies);
                context.SaveChanges();
            }

            if (!context.JobOffers.Any())
            {
                var jobOffers = new[]
                {
                    new JobOffer { JobTitle = "Junior Backend Developer", JobType = "Full-Time", Salary = 5000, ProgrammingLanguage = "C#", Description = "Entry-level backend dev position" },
                    new JobOffer { JobTitle = "Senior Backend Developer", JobType = "Full-Time", Salary = 12000, ProgrammingLanguage = "C#", Description = "Senior backend dev with 5+ years experience" },
                    new JobOffer { JobTitle = "Frontend Developer", JobType = "Full-Time", Salary = 6000, ProgrammingLanguage = "React", Description = "Frontend position for React developer" },
                    new JobOffer { JobTitle = "Junior Frontend Developer", JobType = "Full-Time", Salary = 4500, ProgrammingLanguage = "JavaScript", Description = "Junior frontend developer using JavaScript and React" },
                    new JobOffer { JobTitle = "Full Stack Developer", JobType = "Full-Time", Salary = 8000, ProgrammingLanguage = "JavaScript/Node.js", Description = "Full stack developer with experience in Node.js and React" },
                    new JobOffer { JobTitle = "Senior Software Engineer", JobType = "Contract", Salary = 15000, ProgrammingLanguage = "Java", Description = "Experienced engineer in Java with strong problem-solving skills" },
                    new JobOffer { JobTitle = "Junior QA Engineer", JobType = "Full-Time", Salary = 4000, ProgrammingLanguage = "Manual Testing", Description = "Entry-level QA engineer, strong attention to detail" },
                    new JobOffer { JobTitle = "Data Scientist", JobType = "Full-Time", Salary = 10000, ProgrammingLanguage = "Python", Description = "Data scientist position focusing on machine learning and big data analysis" },
                    new JobOffer { JobTitle = "DevOps Engineer", JobType = "Full-Time", Salary = 11000, ProgrammingLanguage = "Bash/Shell", Description = "DevOps engineer with expertise in AWS, Docker, and Kubernetes" },
                    new JobOffer { JobTitle = "UI/UX Designer", JobType = "Full-Time", Salary = 7000, ProgrammingLanguage = "Design Tools", Description = "Creative UI/UX designer focusing on user-centered design" }
                };

                context.JobOffers.AddRange(jobOffers);
                context.SaveChanges();
            }

            // Seeding REQUIRED technologies
            if (!context.JobOfferTechnologiesRequired.Any())
            {
                var required = new[]
                {
                    new JobOfferTechnologyRequired { JobOfferId = 1, TechnologyIdRequired = 1 }, // C#
                    new JobOfferTechnologyRequired { JobOfferId = 2, TechnologyIdRequired = 1 }, // C#
                    new JobOfferTechnologyRequired { JobOfferId = 3, TechnologyIdRequired = 3 }, // React
                    new JobOfferTechnologyRequired { JobOfferId = 4, TechnologyIdRequired = 2 }, // JavaScript
                    new JobOfferTechnologyRequired { JobOfferId = 5, TechnologyIdRequired = 2 }, // JavaScript
                    new JobOfferTechnologyRequired { JobOfferId = 6, TechnologyIdRequired = 6 }, // Java
                    new JobOfferTechnologyRequired { JobOfferId = 8, TechnologyIdRequired = 5 }, // Python
                    new JobOfferTechnologyRequired { JobOfferId = 9, TechnologyIdRequired = 8 }, // Docker
                    new JobOfferTechnologyRequired { JobOfferId = 9, TechnologyIdRequired = 9 }, // AWS
                };

                context.JobOfferTechnologiesRequired.AddRange(required);
                context.SaveChanges();
            }

            // Seeding NICE-TO-HAVE technologies
            if (!context.JobOfferTechnologiesNiceToHave.Any())
            {
                var niceToHave = new[]
                {
                    new JobOfferTechnologyNiceToHave { JobOfferId = 5, TechnologyIdNiceToHave = 3 }, // React
                    new JobOfferTechnologyNiceToHave { JobOfferId = 7, TechnologyIdNiceToHave = 4 }, // Node.js
                    new JobOfferTechnologyNiceToHave { JobOfferId = 10, TechnologyIdNiceToHave = 10 }, // HTML/CSS
                };

                context.JobOfferTechnologiesNiceToHave.AddRange(niceToHave);
                context.SaveChanges();
            }
        }
    }
}
