using api.Controllers;
using api.Dtos.JobOfferDto;
using api.Dtos.Technology;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.tests.Controllers
{
	public class JobOfferControllerTest
	{
        private readonly Mock<IJobOfferRepository> _offerRepository;
        private readonly JobOfferController _controller;
        public JobOfferControllerTest()
        {
            _offerRepository = new Mock <IJobOfferRepository>();
            _controller = new JobOfferController( _offerRepository.Object );
        }
        [Fact]
        public async Task JobOfferController_GetAllTechnologies_ReturnOk()
        {
            var technologies = new List<Technology>
            {
                new Technology { Id = 1, Name = "C#" },
                new Technology { Id = 2, Name = "Java" }
            };

            _offerRepository.Setup(r => r.GetAllTechnologiesAsync()).ReturnsAsync(technologies);

            var result = await _controller.GetAllTechnologies();

            var okResult = Assert.IsType<OkObjectResult>(result);
            var dtoList= Assert.IsType<List<TechnologyDto>>(okResult.Value);
            Assert.Equal(2, dtoList.Count());
        }

        [Fact]
        public async Task JobOfferController_GetAll_ReturnOk()
        {
            var query = new JobOfferQueryObject();
            _offerRepository.Setup(r => r.GetAllAsync(query)).ReturnsAsync(new List<JobOffer>());

            var result = await _controller.GetAll(query);

            var ok = Assert.IsType<OkObjectResult>(result);
            var dto = Assert.IsType<List<JobOfferDto>>(ok.Value);
            Assert.Empty(dto);

        }

    }
}
