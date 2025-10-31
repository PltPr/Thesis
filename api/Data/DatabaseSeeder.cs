using System.Linq;
using api.Models;

namespace api.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(ApplicationDBContext context)
        {
            // --- TECHNOLOGIES ---
            if (!context.Technologies.Any())
            {
                var technologies = new[]
                {
                    new Technology { Name = "React" },
                    new Technology { Name = "Node.js" },
                    new Technology { Name = "SQL" },
                    new Technology { Name = "Docker" },
                    new Technology { Name = "AWS" },
                    new Technology { Name = "HTML/CSS" }
                };

                context.Technologies.AddRange(technologies);
                context.SaveChanges();
            }

            // --- JOB OFFERS ---
            if (!context.JobOffers.Any())
            {
                var jobOffers = new[]
                {
                    new JobOffer { JobTitle = "Junior Backend Developer", JobType = "Full-Time", Salary = 5000, ProgrammingLanguage = "C#", Description = "Entry-level backend dev position" },
                    new JobOffer { JobTitle = "Senior Backend Developer", JobType = "Full-Time", Salary = 12000, ProgrammingLanguage = "C#", Description = "Senior backend dev with 5+ years experience" },
                    new JobOffer { JobTitle = "Frontend Developer", JobType = "Full-Time", Salary = 6000, ProgrammingLanguage = "JavaScript", Description = "Frontend position for React developer" },
                    new JobOffer { JobTitle = "Junior Frontend Developer", JobType = "Full-Time", Salary = 4500, ProgrammingLanguage = "JavaScript", Description = "Junior frontend developer using JavaScript and React" },
                    new JobOffer { JobTitle = "Full Stack Developer", JobType = "Full-Time", Salary = 8000, ProgrammingLanguage = "JavaScript", Description = "Full stack developer with experience in Node.js and React" },
                    new JobOffer { JobTitle = "Senior Software Engineer", JobType = "Contract", Salary = 15000, ProgrammingLanguage = "Java", Description = "Experienced engineer in Java with strong problem-solving skills" },
                    new JobOffer { JobTitle = "Junior QA Engineer", JobType = "Full-Time", Salary = 4000, ProgrammingLanguage = "JavaScript", Description = "Entry-level QA engineer, strong attention to detail" },
                    new JobOffer { JobTitle = "Data Scientist", JobType = "Full-Time", Salary = 10000, ProgrammingLanguage = "Python", Description = "Data scientist position focusing on machine learning and big data analysis" },
                    new JobOffer { JobTitle = "DevOps Engineer", JobType = "Full-Time", Salary = 11000, ProgrammingLanguage = "Python", Description = "DevOps engineer with expertise in AWS, Docker, and Kubernetes" },
                    new JobOffer { JobTitle = "UI/UX Designer", JobType = "Full-Time", Salary = 7000, ProgrammingLanguage = "JavaScript", Description = "Creative UI/UX designer focusing on user-centered design" }
                };

                context.JobOffers.AddRange(jobOffers);
                context.SaveChanges();
            }

            // --- REQUIRED TECHNOLOGIES ---
            if (!context.JobOfferTechnologiesRequired.Any())
            {
                var required = new[]
                {
                    new JobOfferTechnologyRequired { JobOfferId = 1, TechnologyIdRequired = 3 }, // SQL
                    new JobOfferTechnologyRequired { JobOfferId = 2, TechnologyIdRequired = 3 }, // SQL
                    new JobOfferTechnologyRequired { JobOfferId = 3, TechnologyIdRequired = 1 }, // React
                    new JobOfferTechnologyRequired { JobOfferId = 4, TechnologyIdRequired = 1 }, // React
                    new JobOfferTechnologyRequired { JobOfferId = 5, TechnologyIdRequired = 2 }, // Node.js
                    new JobOfferTechnologyRequired { JobOfferId = 5, TechnologyIdRequired = 1 }, // React
                    new JobOfferTechnologyRequired { JobOfferId = 8, TechnologyIdRequired = 3 }, // SQL
                    new JobOfferTechnologyRequired { JobOfferId = 9, TechnologyIdRequired = 4 }, // Docker
                    new JobOfferTechnologyRequired { JobOfferId = 9, TechnologyIdRequired = 5 }, // AWS
                };

                context.JobOfferTechnologiesRequired.AddRange(required);
                context.SaveChanges();
            }

            // --- NICE TO HAVE TECHNOLOGIES ---
            if (!context.JobOfferTechnologiesNiceToHave.Any())
            {
                var niceToHave = new[]
                {
                    new JobOfferTechnologyNiceToHave { JobOfferId = 5, TechnologyIdNiceToHave = 6 }, // HTML/CSS
                    new JobOfferTechnologyNiceToHave { JobOfferId = 7, TechnologyIdNiceToHave = 1 }, // React
                };

                context.JobOfferTechnologiesNiceToHave.AddRange(niceToHave);
                context.SaveChanges();
            }

            // --- TASK ITEMS ---
            if (!context.TaskItems.Any())
            {
                var tasks = new[]
                {
                    new TaskItem { Description = "Napisz funkcję, która odwraca stringa", ExpectedOutput = "Wejście: 'abc' -> Wyjście: 'cba'", DurationMinutes = 5 },
                    new TaskItem { Description = "Policz sumę liczb w tablicy", ExpectedOutput = "Wejście: [1,2,3] -> Wyjście: 6", DurationMinutes = 7 },
                    new TaskItem { Description = "Zaimplementuj algorytm sortowania bąbelkowego", ExpectedOutput = "Posortowana tablica rosnąco", DurationMinutes = 10 },
                    new TaskItem { Description = "Stwórz prostą tabelę w SQL", ExpectedOutput = "Tabela Users z kolumnami Id, Name, Email", DurationMinutes = 8 },
                    new TaskItem { Description = "Napisz skrypt w Pythonie, który pobiera dane z API", ExpectedOutput = "Wyświetlone dane JSON", DurationMinutes = 12 }
                };

                context.TaskItems.AddRange(tasks);
                context.SaveChanges();
            }

            // --- TESTS ---
            if (!context.Tests.Any())
            {
                var tests = new[]
                {
                    new Test { Tittle = "Test Backend C#", Description = "Sprawdza podstawowe umiejętności backendowe w C#" },
                    new Test { Tittle = "Test Frontend JS", Description = "Test wiedzy z JavaScript i React" },
                    new Test { Tittle = "Test Data Science", Description = "Podstawy Pythona i SQL do analizy danych" }
                };

                context.Tests.AddRange(tests);
                context.SaveChanges();

                // Pobranie prawdziwych Id testów po SaveChanges
                var testBackendId = tests[0].Id;
                var testFrontendId = tests[1].Id;
                var testDataScienceId = tests[2].Id;

                // --- TEST-TASK RELATIONS ---
                var testTasks = new[]
                {
                    new TestTask { TestId = testBackendId, TaskId = 1 },
                    new TestTask { TestId = testBackendId, TaskId = 3 },
                    new TestTask { TestId = testFrontendId, TaskId = 2 },
                    new TestTask { TestId = testFrontendId, TaskId = 5 },
                    new TestTask { TestId = testDataScienceId, TaskId = 4 },
                    new TestTask { TestId = testDataScienceId, TaskId = 5 }
                };

                context.TestTasks.AddRange(testTasks);
                context.SaveChanges();
            }
        }
    }
}
