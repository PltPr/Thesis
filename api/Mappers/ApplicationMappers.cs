using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppalicationDto;
using api.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace api.Mappers
{
    public static class ApplicationMappers
    {
        public static Application ToApplication(this AddApplicationDto model, string userId, int offerId)
        {
            return new Application
            {
                Date = DateTime.Now,
                Status = "new",
                AboutYourself = model.AboutYourself,
                SimilarExperience = model.SimilarExperience,
                ExpectedMonthlySalary = model.ExpectedMonthlySalary,
                AppUserId = userId,
                JobOfferId = offerId,
            };
        }
        public static GetApplicationDto ToDto(this Application model)
        {
            return new GetApplicationDto
            {
                Id = model.Id,
                JobOfferTitle = model.JobOffer?.JobTitle,
                AboutYourself = model.AboutYourself,
                SimilarExperience = model.SimilarExperience,
                ExpectedMonthlySalary = model.ExpectedMonthlySalary,
                Date = model.Date,
                Status = model.Status,
                CvFileName = model.CV.CvFileName,
                CvId = model.CvId,
                TestId = model.TestId,
                AssignTestDate = model.AssignTestDate
            };
        }
        public static ApplicationEvaluation ToAppEvaluationModel(this AddAppEvaluationDto dto)
        {
            return new ApplicationEvaluation
            {
                UserExperienceScore = dto.UserExperienceScore,
                CriteriaMatchScore = dto.CriteriaMatchScore,
                TechnicalSkillScore = dto.TechnicalSkillScore,
                EducationScore = dto.EducationScore,
                RecruiterNote = dto.RecruiterNote
            };
        }
        public static GetAppEvaluationDto toAppEvaluationDto(this ApplicationEvaluation model)
        {
            return new GetAppEvaluationDto
            {
                UserExperienceScore = model.UserExperienceScore,
                CriteriaMatchScore = model.CriteriaMatchScore,
                TechnicalSkillScore = model.TechnicalSkillScore,
                EducationScore = model.EducationScore,
                RecruiterNote = model.RecruiterNote
            };
        }
        public static GetClassificationDto toGetClassificationDto(this Application model)
        {
            return new GetClassificationDto
            {
                ApplicationId=model.Id,
                FirstName=model.AppUser.Name,
                LastName=model.AppUser.Surname,
                EvaluationScore=model.ApplicationEvaluation == null ? 0 :
                Math.Round((model.ApplicationEvaluation.UserExperienceScore *0.2)+
                (model.ApplicationEvaluation.CriteriaMatchScore *0.2)+
                (model.ApplicationEvaluation.TechnicalSkillScore *0.2)+
                (model.ApplicationEvaluation.EducationScore*0.2),2)
            };
        }
    }
}