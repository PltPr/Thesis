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
    <div className="my-[20px] mx-auto p-[25px] w-[400px] bg-white border border-[#0f63ec] rounded-[10px] text-center shadow-[2px_2px_10px_rgba(0,0,0,0.1)]">

      <div className="bg-[#0f63ec] text-white p-[15px] rounded-t-[10px]">
        <h1 className="text-[24px] m-0 uppercase">{jobOffer.jobTitle}</h1>
        <p className="salary text-[18px] mt-[5px]">${jobOffer.salary}</p>
      </div>


      <div className="info-section p-[20px] text-[16px] text-black text-left">
        <p className="my-[10px]">
          <strong>Programming Language:</strong> {jobOffer.programmingLanguage}
        </p>
        <p className="my-[10px]">
          <strong>Job Type:</strong> {jobOffer.jobType}
        </p>
        <p className="my-[10px]">
          <strong>Description:</strong>{" "}
          {jobOffer.description || "No description available."}
        </p>
      </div>


      <button className="rounded-[6px] bg-[#0f63ec] text-white text-[18px] py-[10px] px-[20px] w-full mt-[20px] uppercase border-0 cursor-pointer transition-all duration-500 hover:bg-[#135dd3]">
        Apply Now
      </button>
    </div>
  );
};

export default CardDetailPage;
