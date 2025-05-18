using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.AppalicationDto;
using api.Models;
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
                CV = model.CV,
                AppUserId = userId,
                JobOfferId = offerId
            };
        }
        public static GetApplicationDto ApplicationToDto(this Application model)
        {
            return new GetApplicationDto
            {
                JobOfferTitle = model.JobOffer?.JobTitle,
                Date = model.Date,
                Status = model.Status,
                CV=model.CV
            };
        }
    }
}