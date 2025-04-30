using System.Linq;
using api.Models;

namespace api.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(ApplicationDBContext context)
{
    if (!context.Technology.Any()) // If the Technologies table is empty
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

        context.Technology.AddRange(technologies);
        context.SaveChanges(); // Commit technologies to the database
    }

    if (!context.JobOffer.Any()) // If the JobOffers table is empty
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

        context.JobOffer.AddRange(jobOffers);
        context.SaveChanges(); // Commit job offers to the database
    }

    if (!context.JobOfferTechnology.Any()) // If the JobOfferTechnology table is empty
    {
        var jobOfferTechnologies = new[]
        {
            new JobOfferTechnology { JobOfferId = 1, TechnologyId = 1 }, // Junior Backend Developer - C#
            new JobOfferTechnology { JobOfferId = 2, TechnologyId = 1 }, // Senior Backend Developer - C#
            new JobOfferTechnology { JobOfferId = 3, TechnologyId = 3 }, // Frontend Developer - React
            new JobOfferTechnology { JobOfferId = 4, TechnologyId = 2 }, // Junior Frontend Developer - JavaScript
            new JobOfferTechnology { JobOfferId = 5, TechnologyId = 2 }, // Full Stack Developer - JavaScript
            new JobOfferTechnology { JobOfferId = 5, TechnologyId = 3 }, // Full Stack Developer - React
            new JobOfferTechnology { JobOfferId = 6, TechnologyId = 5 }, // Senior Software Engineer - Python
            new JobOfferTechnology { JobOfferId = 7, TechnologyId = 4 }, // Junior QA Engineer - Manual Testing
            new JobOfferTechnology { JobOfferId = 8, TechnologyId = 5 }, // Data Scientist - Python
            new JobOfferTechnology { JobOfferId = 9, TechnologyId = 8 }, // DevOps Engineer - Docker
            new JobOfferTechnology { JobOfferId = 9, TechnologyId = 9 }, // DevOps Engineer - AWS
            new JobOfferTechnology { JobOfferId = 10, TechnologyId = 10 }, // UI/UX Designer - HTML/CSS
        };

        context.JobOfferTechnology.AddRange(jobOfferTechnologies);
        context.SaveChanges(); // Commit job offer technologies to the database
    }
}

    }
}
