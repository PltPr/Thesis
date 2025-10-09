using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppalicationDto;
using api.Models;

namespace api.Interfaces
{
    public interface IApplicationRepository
    {
        Task<Application> AddAplicationAsync(Application model);
        Task<Application> GetByIdAsync(int id);
        Task<List<Application>> GetUserApplications(string userId);
        Task<List<GroupApplicationsDto>> GroupedApplications();
        Task<Application?> AssignTestToAppAsync(int appId, int testId);
        Task<Application?> RejectAppAsync(int appId);

    }
}