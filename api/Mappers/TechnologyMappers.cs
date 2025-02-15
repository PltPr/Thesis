using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Technology;
using api.Models;

namespace api.Mappers
{
    public static class TechnologyMappers
    {
        public static TechnologyDto asDto(this Technology model)
        {
            return new TechnologyDto{
                Name=model.Name
            };
        }
    }
}