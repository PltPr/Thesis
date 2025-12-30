import { getJobOffersApi } from 'Api/JobOfferServices';
import { JobOfferGet } from 'Models/JobOffers';
import AddJobOfferModal from 'Modules/AdminPage/AddJobOfferModal';
import JobOfferManagementModal from 'Modules/AdminPage/JobOfferManagementModal';
import React, { useEffect, useState } from 'react';

const JobOfferManagement = () => {
  const [jobOffers, setJobOffers] = useState<JobOfferGet[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addJobOfferModalOpen, setAddJobOfferModalOpen] = useState(false);
  const [selectedJobOffer, setSelectedJobOffer] = useState<JobOfferGet | null>(null);

  const getData = async () => {
    try {
      const jobOfferData = await getJobOffersApi();
      if (jobOfferData) setJobOffers(jobOfferData);
    } catch (err) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => {
    setModalOpen(false);
    setSelectedJobOffer(null);
    getData();
  };

  const handleCloseAddOfferModal = () => {
    setAddJobOfferModalOpen(false);
    getData();
  };

  if (!jobOffers)
    return (
      <div className="flex justify-center items-center h-48">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-lg min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Zarządzanie ofertami pracy</h2>

      {jobOffers.length === 0 ? (
        <p className="text-gray-600 text-lg">Brak ofert pracy.</p>
      ) : (
        <ul className="divide-y divide-gray-300 rounded-xl border border-gray-300 bg-white shadow-md">
          {jobOffers.map((offer) => (
            <li
              key={offer.id}
              className="flex justify-between items-center px-6 py-4 hover:bg-blue-50 transition cursor-pointer"
            >
              <span className="text-lg font-medium text-gray-900">{offer.jobTitle}</span>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setSelectedJobOffer(offer);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                aria-label={`Manage job offer ${offer.jobTitle}`}
              >
                Manage
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setAddJobOfferModalOpen(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition"
          aria-label="Add new job offer"
        >
          Add Offer
        </button>
      </div>

      {modalOpen && selectedJobOffer && (
        <JobOfferManagementModal onClose={handleClose} JobOfferData={selectedJobOffer} />
      )}
      {addJobOfferModalOpen && <AddJobOfferModal onClose={handleCloseAddOfferModal} />}
    </div>
  );
};

export default JobOfferManagement;
