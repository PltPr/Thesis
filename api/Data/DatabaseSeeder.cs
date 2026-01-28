using System.Linq;
using api.Models;

namespace api.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(ApplicationDBContext context)
        {
            // =====================================================================
            //  TECHNOLOGIES
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

                    new Technology { Name = "Tailwind CSS" },
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

            // =====================================================================
            //  JOB OFFERS
            // =====================================================================
            if (!context.JobOffers.Any())
            {
                var jobOffers = new[]
                {
                    new JobOffer
                    {
                        JobTitle = "Junior Backend Developer",
                        JobType = "Full-Time",
                        Salary = 1300,
                        ProgrammingLanguage = "C#",
                        Description =
                            "We are looking for a Junior Backend Developer who has a basic understanding of C#, RESTful APIs and relational databases. " +
                            "You will work on developing and maintaining backend services built with .NET, participate in code reviews and learn best practices. " +
                            "The role includes working with Dockerized applications and collaborating closely with more experienced developers. " +
                            "We offer strong mentorship, structured onboarding and the opportunity to grow into a mid-level role."
                    },
                    new JobOffer
                    {
                        JobTitle = "Mid Backend Developer",
                        JobType = "Full-Time",
                        Salary = 2500,
                        ProgrammingLanguage = "C#",
                        Description =
                            "As a Mid Backend Developer, you will be responsible for building, maintaining and optimizing backend services using .NET 8. " +
                            "Your daily tasks will include designing APIs, integrating external systems, improving database performance and ensuring code quality. " +
                            "You will actively contribute to architectural decisions and work in an agile, cross-functional team environment."
                    },
                    new JobOffer
                    {
                        JobTitle = "Senior Backend Developer",
                        JobType = "Full-Time",
                        Salary = 3800,
                        ProgrammingLanguage = "C#",
                        Description =
                            "We expect deep expertise in backend development, including microservice architecture, API design and high-availability systems. " +
                            "The role involves making architectural decisions, improving system scalability and reliability, and mentoring junior developers. " +
                            "You will have a significant impact on the technical direction of the product and work closely with DevOps and product teams."
                    },
                    new JobOffer
                    {
                        JobTitle = "Frontend Developer",
                        JobType = "Full-Time",
                        Salary = 2300,
                        ProgrammingLanguage = "JavaScript",
                        Description =
                            "You will be responsible for developing modern user interfaces using React and TypeScript. " +
                            "Your work will focus on reusable components, application performance, accessibility and seamless integration with backend APIs. " +
                            "Close collaboration with designers and backend developers is an essential part of this role."
                    },
                    new JobOffer
                    {
                        JobTitle = "Junior Frontend Developer",
                        JobType = "Full-Time",
                        Salary = 1500,
                        ProgrammingLanguage = "JavaScript",
                        Description =
                            "This position is ideal for developers at the beginning of their frontend career. " +
                            "You will work on maintaining and extending React applications, focusing on clean UI implementation, CSS styling and accessibility. " +
                            "You will gain hands-on experience with component-based architecture and frontend testing."
                    },
                    new JobOffer
                    {
                        JobTitle = "Full Stack Developer",
                        JobType = "Full-Time",
                        Salary = 2900,
                        ProgrammingLanguage = "JavaScript",
                        Description =
                            "As a Full Stack Developer, you will work across the entire application stack, including Node.js, React and SQL databases. " +
                            "The role requires confidence in both frontend and backend development, API design and containerized environments. " +
                            "You will take part in designing features end-to-end, from database schema to user interface."
                    },
                    new JobOffer
                    {
                        JobTitle = "Senior Software Engineer",
                        JobType = "Contract",
                        Salary = 5000,
                        ProgrammingLanguage = "Java",
                        Description =
                            "This role focuses on designing and developing highly scalable enterprise systems. " +
                            "You will work with Kubernetes, CI/CD pipelines, monitoring tools and cloud infrastructure. " +
                            "The position requires strong system design skills and experience with large, distributed architectures."
                    },
                    new JobOffer
                    {
                        JobTitle = "Junior QA Engineer",
                        JobType = "Full-Time",
                        Salary = 1400,
                        ProgrammingLanguage = "JavaScript",
                        Description =
                            "You will be responsible for writing and maintaining automated tests, testing APIs and validating application functionality. " +
                            "The role includes working with tools such as Postman and CI/CD pipelines to ensure software quality. " +
                            "This position offers a strong foundation for a career in quality assurance and test automation."
                    },
                    new JobOffer
                    {
                        JobTitle = "Data Scientist",
                        JobType = "Full-Time",
                        Salary = 3200,
                        ProgrammingLanguage = "Python",
                        Description =
                            "The Data Scientist role focuses on data analysis, statistical modeling and machine learning. " +
                            "You will work with large datasets, build predictive models and collaborate with engineering teams to deploy solutions. " +
                            "Experience with SQL and data processing libraries such as pandas is required."
                    },
                    new JobOffer
                    {
                        JobTitle = "DevOps Engineer",
                        JobType = "Full-Time",
                        Salary = 4000,
                        ProgrammingLanguage = "Go",
                        Description =
                            "You will be responsible for building and maintaining CI/CD pipelines and automating cloud infrastructure. " +
                            "The role includes working with Terraform, Docker and Kubernetes to ensure reliable deployments. " +
                            "You will collaborate closely with development teams to improve system stability and deployment processes."
                    },
                    new JobOffer
                    {
                        JobTitle = "UI/UX Designer",
                        JobType = "Full-Time",
                        Salary = 2500,
                        ProgrammingLanguage = "N/A",
                        Description =
                            "You will design intuitive and visually appealing user interfaces. " +
                            "Your responsibilities include creating wireframes, prototypes and design systems using tools such as Figma. " +
                            "You will work closely with developers to ensure a consistent and user-friendly experience."
                    }
                };

                context.JobOffers.AddRange(jobOffers);
                context.SaveChanges();
            }

            // =====================================================================
            //  REQUIRED TECHNOLOGIES
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
            //  NICE TO HAVE TECHNOLOGIES
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
            //  TASK ITEMS
            // =====================================================================
            if (!context.TaskItems.Any())
            {
                var tasks = new[]
                {
                    new TaskItem { Description = "Write a function that reverses a given string", ExpectedOutput = "'abc' -> 'cba'", DurationMinutes = 5 },
                    new TaskItem { Description = "Print numbers from 1 to 100, each on a new line", ExpectedOutput = "1 2 3 ... 100", DurationMinutes = 4 },
                    new TaskItem { Description = "Calculate the sum of all numbers in a given collection", ExpectedOutput = "[1,2,3] -> 6", DurationMinutes = 5 },
                    new TaskItem { Description = "Implement the bubble sort algorithm", ExpectedOutput = "Sorted array", DurationMinutes = 10 },
                    new TaskItem { Description = "List all files in the current directory", ExpectedOutput = "File list", DurationMinutes = 4 },
                    new TaskItem { Description = "Create a file named 'test.txt' and write any text into it", ExpectedOutput = "File created with content", DurationMinutes = 3 },
                    new TaskItem { Description = "Print the length of each string in an array", ExpectedOutput = "['a','bb','ccc'] -> [1,2,3]", DurationMinutes = 6 },
                    new TaskItem { Description = "Fetch data from an HTTP endpoint and print it to the console", ExpectedOutput = "JSON data", DurationMinutes = 12 },
                    new TaskItem { Description = "Count the occurrences of each character in a string", ExpectedOutput = "a:2, b:1", DurationMinutes = 7 },
                    new TaskItem { Description = "Generate 20 random numbers and print the maximum value", ExpectedOutput = "Max value", DurationMinutes = 6 },
                };

                context.TaskItems.AddRange(tasks);
                context.SaveChanges();
            }

            // =====================================================================
            //  TESTS AND RELATIONS
            // =====================================================================
            if (!context.Tests.Any())
            {
                var tests = new[]
                {
                    new Test { Tittle = "Backend C# Test", Description = "Knowledge of .NET, APIs, algorithms and SQL." },
                    new Test { Tittle = "Frontend JavaScript Test", Description = "JavaScript fundamentals, React and TypeScript tasks." },
                    new Test { Tittle = "Data Science Test", Description = "Data analysis, SQL queries and machine learning basics." },
                    new Test { Tittle = "DevOps Test", Description = "Docker, Kubernetes, CI/CD pipelines and infrastructure automation." }
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
