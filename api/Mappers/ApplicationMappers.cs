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
                Description = model.Description,
                AppUserId = userId,
                JobOfferId = offerId,
            };
        }
        public static GetApplicationDto ToDto(this Application model)
        {
            return new GetApplicationDto
            {
                JobOfferTitle = model.JobOffer?.JobTitle,
                Description = model.Description,
                Date = model.Date,
                Status = model.Status,
                CvFileName = model.CV.CvFileName,
                CvId = model.CvId,
                TestId=model.TestId
            };
        }
    }
}