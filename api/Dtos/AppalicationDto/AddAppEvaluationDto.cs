using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.AppalicationDto
{
    public class AddAppEvaluationDto
    {
        public int AppId { get; set; }
        public int UserExperienceScore { get; set; }
        public int CriteriaMatchScore { get; set; }
        public int TechnicalSkillScore { get; set; }
        public int EducationScore { get; set; }
        public string? RecruiterNote { get; set; }
    }
}