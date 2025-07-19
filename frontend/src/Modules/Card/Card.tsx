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
      className=" block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden max-w-xl mx-auto my-4"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Optional Image Placeholder */}
        <div className="sm:w-1/4 bg-gray-100 flex items-center justify-center p-4">
          {/* Replace with actual image if available */}
          <span className="text-3xl text-gray-400">🏢</span>
        </div>

        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-1 uppercase">
              {jobOffer.jobTitle}
            </h2>
            <p className="text-sm text-gray-500 uppercase mb-3">
              {jobOffer.jobType}
            </p>
            <div className="flex items-center text-gray-700 mb-4">
              <span className="font-bold text-lg mr-2">
                ${jobOffer.salary}
              </span>
              <span className="text-sm bg-blue-100 text-blue-600 py-1 px-3 rounded-full">
                {jobOffer.programmingLanguage}
              </span>
            </div>
          </div>

          {/* Tags / Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {jobOffer.jobOfferTechnology?.map((tech) => (
              <span
                key={tech.name}
                className="text-sm bg-gray-100 text-gray-800 py-1 px-3 rounded-full"
              >
                {tech.name}
              </span>
            ))}
          </div>

          {/* Details Button */}
          <div className="text-right">
            <span className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg uppercase text-sm hover:bg-blue-700 transition-colors duration-300">
              Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;