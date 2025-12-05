import React from "react";
import { Link } from "react-router-dom";
import { JobOfferGet } from "../../Models/JobOffers";

interface Props {
  jobOffer: JobOfferGet;
}

const Card: React.FC<Props> = ({ jobOffer }) => {
  const required = jobOffer.jobOfferTechnologyRequired || [];
  const niceToHave = jobOffer.jobOfferTechnologyNiceToHave || [];

  return (
    <Link
      to={`/card-detail-page/${jobOffer.id}`}
      state={{ jobOffer }}
      className="block bg-white border border-blue-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-5 p-5">

        {/* Fake logo */}
        <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-semibold">
          {jobOffer.jobTitle[0]}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">

          <h2 className="text-xl font-semibold text-gray-900 truncate">
            {jobOffer.jobTitle}
          </h2>

          <p className="text-sm text-gray-500 truncate">
            {jobOffer.jobType} • {jobOffer.programmingLanguage}
          </p>

          {/* Required Technologies */}
          <div className="flex flex-wrap gap-2 mt-3">
            {required.slice(0, 4).map((tech) => (
              <span
                key={`req-${tech.name}`}
                className="text-xs bg-blue-100 text-blue-700 py-1 px-2 rounded-md"
              >
                {tech.name}
              </span>
            ))}

            {required.length > 4 && (
              <span className="text-xs text-gray-500">
                +{required.length - 4}
              </span>
            )}
          </div>

          {/* Nice to Have */}
          {niceToHave.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-1">
              {niceToHave.slice(0, 3).map((tech) => (
                <span
                  key={`nice-${tech.name}`}
                  className="text-xs bg-green-100 text-green-700 py-1 px-2 rounded-md"
                >
                  {tech.name}
                </span>
              ))}

              {niceToHave.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{niceToHave.length - 3}
                </span>
              )}
            </div>
          )}

        </div>

        {/* Salary */}
        <div className="min-w-[100px] text-right">
          <span className="text-blue-600 font-semibold text-lg">
            €{jobOffer.salary}
          </span>
          <div className="text-xs text-gray-400">per month</div>
        </div>

      </div>
    </Link>
  );
};

export default Card;
