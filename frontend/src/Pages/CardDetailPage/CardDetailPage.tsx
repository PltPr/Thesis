import React from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { JobOfferGet } from "../../Models/JobOffers";


const CardDetailPage: React.FC = () => {
  const { offerId } = useParams();
  const location = useLocation();
  const jobOffer = location.state?.jobOffer as JobOfferGet;


  if (!jobOffer) {
    return <Navigate to="/" />;
  }

  return (
    <div className=" w-[400px] h-[400px] m-5 bg-white border border-[#0f63ec] rounded-[10px] text-center shadow-[2px_2px_10px_rgba(0,0,0,0.1)] grid grid-cols-4">

      <div className="col-start-1 col-end-3 flex flex-col">
        <h1>{jobOffer.jobTitle}</h1>
      </div>

      <div className="col-start-1 col-end-2 flex">
          <h1>Time</h1>
      </div>

    </div>
  );
};

export default CardDetailPage;
