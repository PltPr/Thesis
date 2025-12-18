using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppalicationDto;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IApplicationRepository
    {
        Task<Application> AddAplicationAsync(Application model);
        Task<Application> GetByIdAsync(int id);
        Task<List<Application>> GetUserApplications(string userId);
        Task<List<GroupApplicationsDto>> GroupedApplications(ApplicationsQueryObject query);
        Task<Application?> AssignTestToAppAsync(int appId, int testId);
        Task<Application?> RejectAppAsync(int appId);
        Task<ApplicationEvaluation?> AddEvaluationForAppAsync(AddAppEvaluationDto dto);
        Task<ApplicationEvaluation?> GetEvaluationForAppAsync(int appId);
        Task<List<GetClassificationGroupDto>>GetClassificationAsync();
        Task<bool>CheckIfUserApplied(string userId,int offerId);
        Task<Application?>InviteToInterview(int appId);
        Task<GetSummaryDto?>GetUserSummaryAsync(string userId);
    }
}