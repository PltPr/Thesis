using System.Linq;
using api.Models;

namespace api.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(ApplicationDBContext context)
        {
            // =====================================================================
            //  TECHNOLOGIES (ROZSZERZONE)
            // =====================================================================
            if (!context.Technologies.Any())
            {
                var technologies = new[]
                {
                    new Technology { Name = "React" },
                    new Technology { Name = "Node.js" },
                    new Technology { Name = "SQL" },
                    new Technology { Name = "Azure DevOps" },
                    new Technology { Name = "AWS" },
                    new Technology { Name = "HTML/CSS" },

                    new Technology { Name = "Tailwind" },
                    new Technology { Name = "Docker" },
                    new Technology { Name = "T-SQL" },
                    new Technology { Name = "Go" },
                    new Technology { Name = "TypeScript" },
                    new Technology { Name = "Vue.js" },
                    new Technology { Name = "Angular" },
                    new Technology { Name = "Kubernetes" },
                    new Technology { Name = "Terraform" },
                    new Technology { Name = "PostgreSQL" },
                    new Technology { Name = "MongoDB" },
                    new Technology { Name = "Redis" },
                    new Technology { Name = "GraphQL" },
                    new Technology { Name = "CI/CD" }
                };

                context.Technologies.AddRange(technologies);
                context.SaveChanges();
            }

            
            if (!context.JobOffers.Any())
            {
                var jobOffers = new[]
                {
                    new JobOffer {
                        JobTitle = "Junior Backend Developer",
                        JobType = "Full-Time",
                        Salary = 1300,
                        ProgrammingLanguage = "C#",
                        Description = "Poszukujemy Junior Backend Developera znającego podstawy C#, REST API oraz SQL. Kandydat będzie rozwijał mikroserwisy w środowisku opartym o .NET i Docker. Oferujemy wsparcie mentora oraz realny wpływ na kod."
                    },
                    new JobOffer {
                        JobTitle = "Mid Backend Developer",
                        JobType = "Full-Time",
                        Salary = 2500,
                        ProgrammingLanguage = "C#",
                        Description = "Praca nad budową i utrzymaniem systemów backendowych w .NET 8, integracje systemów, optymalizacja zapytań SQL i projektowanie architektury usług."
                    },
                    new JobOffer {
                        JobTitle = "Senior Backend Developer",
                        JobType = "Full-Time",
                        Salary = 3800,
                        ProgrammingLanguage = "C#",
                        Description = "Wymagamy głębokiej wiedzy o architekturze mikroserwisów, projektowaniu API, optymalizacji systemów wysokiej dostępności oraz mentoringu młodszych programistów."
                    },
                    new JobOffer {
                        JobTitle = "Frontend Developer",
                        JobType = "Full-Time",
                        Salary = 2300,
                        ProgrammingLanguage = "JavaScript",
                        Description = "Tworzenie interfejsów użytkownika przy użyciu React + TypeScript. Praca obejmuje projektowanie komponentów, optymalizację wydajności i współpracę z backendem."
                    },
                    new JobOffer {
                        JobTitle = "Junior Frontend Developer",
                        JobType = "Full-Time",
                        Salary = 1500,
                        ProgrammingLanguage = "JavaScript",
                        Description = "Rozwój i utrzymanie aplikacji React. Dużo pracy z CSS, dostępnością, komponentami UI oraz testami jednostkowymi."
                    },
                    new JobOffer {
                        JobTitle = "Full Stack Developer",
                        JobType = "Full-Time",
                        Salary = 2900,
                        ProgrammingLanguage = "JavaScript",
                        Description = "Praca obejmuje Node.js, React, SQL oraz Docker. Kandydat musi czuć się swobodnie zarówno we frontendzie, jak i backendzie."
                    },
                    new JobOffer {
                        JobTitle = "Senior Software Engineer",
                        JobType = "Contract",
                        Salary = 5000,
                        ProgrammingLanguage = "Java",
                        Description = "Projektowanie architektury systemów wysokiej skalowalności, praca z Kubernetes, CI/CD, monitoringiem i integracjami enterprise."
                    },
                    new JobOffer {
                        JobTitle = "Junior QA Engineer",
                        JobType = "Full-Time",
                        Salary = 1400,
                        ProgrammingLanguage = "JavaScript",
                        Description = "Pisanie testów automatycznych, testowanie API, praca z Postmanem i narzędziami CI/CD."
                    },
                    new JobOffer {
                        JobTitle = "Data Scientist",
                        JobType = "Full-Time",
                        Salary = 3200,
                        ProgrammingLanguage = "Python",
                        Description = "Modelowanie danych, budowa modeli ML, analiza danych, praca z SQL i dużymi zbiorami danych (BigQuery, pandas)."
                    },
                    new JobOffer {
                        JobTitle = "DevOps Engineer",
                        JobType = "Full-Time",
                        Salary = 4000,
                        ProgrammingLanguage = "Go",
                        Description = "Budowa pipelines CI/CD, automatyzacja infrastruktury Terraform, konteneryzacja oraz orkiestracja Kubernetes."
                    },
                    new JobOffer {
                        JobTitle = "UI/UX Designer",
                        JobType = "Full-Time",
                        Salary = 2500,
                        ProgrammingLanguage = "N/A",
                        Description = "Projektowanie intuicyjnych interfejsów użytkownika, praca z Figma, prototypowaniem oraz optymalizacją użyteczności."
                    }
                };

                context.JobOffers.AddRange(jobOffers);
                context.SaveChanges();
            }

            // =====================================================================
            //  REQUIRED TECHNOLOGIES (ROZBUDOWANE)
            // =====================================================================
            if (!context.JobOfferTechnologiesRequired.Any())
            {
                var required = new[]
                {
                    new JobOfferTechnologyRequired { JobOfferId = 1, TechnologyIdRequired = 7 }, 
                    new JobOfferTechnologyRequired { JobOfferId = 1, TechnologyIdRequired = 3 }, 
                    new JobOfferTechnologyRequired { JobOfferId = 2, TechnologyIdRequired = 7 },
                    new JobOfferTechnologyRequired { JobOfferId = 2, TechnologyIdRequired = 16 },
                    new JobOfferTechnologyRequired { JobOfferId = 3, TechnologyIdRequired = 7 },
                    new JobOfferTechnologyRequired { JobOfferId = 3, TechnologyIdRequired = 14 }, 
                    new JobOfferTechnologyRequired { JobOfferId = 4, TechnologyIdRequired = 1 },
                    new JobOfferTechnologyRequired { JobOfferId = 4, TechnologyIdRequired = 11 },
                    new JobOfferTechnologyRequired { JobOfferId = 5, TechnologyIdRequired = 1 },
                    new JobOfferTechnologyRequired { JobOfferId = 6, TechnologyIdRequired = 1 },
                    new JobOfferTechnologyRequired { JobOfferId = 6, TechnologyIdRequired = 2 },
                    new JobOfferTechnologyRequired { JobOfferId = 9, TechnologyIdRequired = 9 },
                    new JobOfferTechnologyRequired { JobOfferId = 9, TechnologyIdRequired = 3 },
                    new JobOfferTechnologyRequired { JobOfferId = 10, TechnologyIdRequired = 4 },
                    new JobOfferTechnologyRequired { JobOfferId = 10, TechnologyIdRequired = 14 },
                };

                context.JobOfferTechnologiesRequired.AddRange(required);
                context.SaveChanges();
            }

            // =====================================================================
            //  NICE TO HAVE TECHNOLOGIES (ROZBUDOWANE)
            // =====================================================================
            if (!context.JobOfferTechnologiesNiceToHave.Any())
            {
                var niceToHave = new[]
                {
                    new JobOfferTechnologyNiceToHave { JobOfferId = 1, TechnologyIdNiceToHave = 4 },
                    new JobOfferTechnologyNiceToHave { JobOfferId = 2, TechnologyIdNiceToHave = 19 },
                    new JobOfferTechnologyNiceToHave { JobOfferId = 4, TechnologyIdNiceToHave = 12 },
                    new JobOfferTechnologyNiceToHave { JobOfferId = 6, TechnologyIdNiceToHave = 5 },
                    new JobOfferTechnologyNiceToHave { JobOfferId = 10, TechnologyIdNiceToHave = 15 },
                };

                context.JobOfferTechnologiesNiceToHave.AddRange(niceToHave);
                context.SaveChanges();
            }

            // =====================================================================
            //  TASK ITEMS (PROSTE, TERMINALOWE, PROGRAMISTYCZNE)
            // =====================================================================
            if (!context.TaskItems.Any())
            {
                var tasks = new[]
                {
                    new TaskItem { Description = "Napisz funkcję, która odwraca stringa podanego jako argument", ExpectedOutput = "'abc' -> 'cba'", DurationMinutes = 5 },
                    new TaskItem { Description = "Wypisz liczby od 1 do 100, każdą w nowej linii", ExpectedOutput = "1 2 3 ... 100", DurationMinutes = 4 },
                    new TaskItem { Description = "Policz sumę wszystkich liczb w podanym zbiorze", ExpectedOutput = "[1,2,3] -> 6", DurationMinutes = 5 },
                    new TaskItem { Description = "Zaimplementuj sortowanie bąbelkowe", ExpectedOutput = "Posortowana tablica", DurationMinutes = 10 },
                    new TaskItem { Description = "Wypisz wszystkie pliki w bieżącym katalogu", ExpectedOutput = "lista plików", DurationMinutes = 4 },
                    new TaskItem { Description = "Stwórz plik o nazwie 'test.txt' i wpisz do niego dowolny tekst", ExpectedOutput = "plik utworzony + treść", DurationMinutes = 3 },
                    new TaskItem { Description = "Wypisz długość każdego elementu tablicy stringów", ExpectedOutput = "['a','bb','ccc'] -> [1,2,3]", DurationMinutes = 6 },
                    new TaskItem { Description = "Pobierz dane z endpointu HTTP i wypisz je w konsoli", ExpectedOutput = "dane JSON", DurationMinutes = 12 },
                    new TaskItem { Description = "Napisz program, który liczy ilość wystąpień każdego znaku w stringu", ExpectedOutput = "a:2, b:1", DurationMinutes = 7 },
                    new TaskItem { Description = "Wygeneruj 20 losowych liczb i wypisz największą z nich", ExpectedOutput = "max value", DurationMinutes = 6 },
                };

                context.TaskItems.AddRange(tasks);
                context.SaveChanges();
            }

            // =====================================================================
            //  TESTS + RELATIONS (ROZSZERZONE)
            // =====================================================================
            if (!context.Tests.Any())
            {
                var tests = new[]
                {
                    new Test { Tittle = "Test Backend C#", Description = "Wiedza z zakresu .NET, API, algorytmów oraz SQL." },
                    new Test { Tittle = "Test Frontend JS", Description = "Pytania + praktyczne zadania z JavaScript, React i TypeScript." },
                    new Test { Tittle = "Test Data Science", Description = "Analiza danych, SQL, manipulacja danymi, modele ML." },
                    new Test { Tittle = "Test DevOps", Description = "Kubernetes, Docker, CI/CD, automatyzacja infrastruktury." }
                };

                context.Tests.AddRange(tests);
                context.SaveChanges();

                var backend = tests[0].Id;
                var frontend = tests[1].Id;
                var data = tests[2].Id;
                var devops = tests[3].Id;

                var testTasks = new[]
                {
                    new TestTask { TestId = backend, TaskId = 1 },
                    new TestTask { TestId = backend, TaskId = 4 },
                    new TestTask { TestId = backend, TaskId = 9 },

                    new TestTask { TestId = frontend, TaskId = 2 },
                    new TestTask { TestId = frontend, TaskId = 3 },

                    new TestTask { TestId = data, TaskId = 3 },
                    new TestTask { TestId = data, TaskId = 10 },

                    new TestTask { TestId = devops, TaskId = 5 },
                    new TestTask { TestId = devops, TaskId = 6 }
                };

                context.TestTasks.AddRange(testTasks);
                context.SaveChanges();
            }
        }
    }
}
