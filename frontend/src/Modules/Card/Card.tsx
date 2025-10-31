import React from 'react';
import { Link } from 'react-router-dom';
import { JobOfferGet } from '../../Models/JobOffers';

interface Props {
  jobOffer: JobOfferGet;
}

const Card: React.FC<Props> = ({ jobOffer }) => {
  return (
    <Link
      to={`/card-detail-page/${jobOffer.id}`}
      state={{ jobOffer }}
      className="block border border-gray-200 hover:border-blue-400 transition-all duration-200 rounded-lg bg-white hover:bg-gray-50"
    >
      <div className="flex items-center justify-between p-4 gap-4">
        {/* Ikona lub logo firmy */}
        <div className="flex-shrink-0 w-16 h-16 bg-gray-100 flex items-center justify-center rounded-md">
          <span className="text-2xl text-gray-400">ikona</span>
        </div>

        {/* Główne informacje */}
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {jobOffer.jobTitle}
          </h2>
          <p className="text-sm text-gray-500 truncate">
            {jobOffer.jobType} • {jobOffer.programmingLanguage}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            {jobOffer.jobOfferTechnology?.slice(0, 4).map((tech) => (
              <span
                key={tech.name}
                className="text-xs bg-gray-100 text-gray-700 py-0.5 px-2 rounded-md"
              >
                {tech.name}
              </span>
            ))}
            {jobOffer.jobOfferTechnology?.length > 4 && (
              <span className="text-xs text-gray-500">
                +{jobOffer.jobOfferTechnology.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Prawa sekcja — wynagrodzenie i przycisk */}
        <div className="flex flex-col items-end min-w-[100px]">
          <span className="text-blue-600 font-semibold text-base">
            ${jobOffer.salary}
          </span>
          <span className="text-xs text-gray-400">per month</span>
          <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
            Szczegóły →
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
