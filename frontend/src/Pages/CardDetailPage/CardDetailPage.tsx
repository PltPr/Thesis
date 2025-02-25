import React from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { JobOfferGet } from "../../Models/JobOffers";
import "./CardDetailPage.css";

const CardDetailPage: React.FC = () => {
  const { offerId } = useParams(); // Pobieramy ID z URL
  const location = useLocation();
  const jobOffer = location.state?.jobOffer as JobOfferGet; // Pobieramy przekazane dane

  // Obsługa sytuacji, gdy użytkownik odświeży stronę
  if (!jobOffer) {
    return <Navigate to="/" />;
  }

  return (
    <div className="card-detail">
      <div className="detail-header">
        <h1>{jobOffer.jobTitle}</h1>
        <p className="salary">${jobOffer.salary} </p>
      </div>

      <div className="info-section">
        <p><strong>Programming Language:</strong> {jobOffer.programmingLanguage}</p>
        <p><strong>Job Type:</strong> {jobOffer.jobType}</p>
        <p><strong>Description:</strong> {jobOffer.description || "No description available."}</p>
      </div>

      <button className="apply-button">Apply Now</button>
    </div>
  );
};

export default CardDetailPage;
