import { getJobOffersApi } from 'Api/JobOfferServices'
import { JobOfferGet } from 'Models/JobOffers'
import AddJobOfferModal from 'Modules/AdminPage/AddJobOfferModal'
import JobOfferManagementModal from 'Modules/AdminPage/JobOfferManagementModal'
import React, { useEffect, useState } from 'react'

type Props = {}

const JobOfferManagement = (props: Props) => {
    const[jobOffers,setJobOffers]=useState<JobOfferGet[]|null>(null)

    const[modalOpen,setModalOpen]=useState<boolean>(false);
    const[addJobOfferModalOpen,setAddJobOfferModalOpen]=useState<boolean>(false)
    const[selectedJobOffer,setSelectedJobOffer]=useState<JobOfferGet|null>(null);

    const getData = async()=>{
            try{
                const jobOfferData= await getJobOffersApi()
                if(jobOfferData)setJobOffers(jobOfferData)
            }catch(err){

            }
        };

    useEffect(()=>{
         getData()
    },[])

    const handleClose=()=>{
      setModalOpen(false)
      setSelectedJobOffer(null)
      getData()
    }
    const handleCloseAddOfferModal=()=>{
      setAddJobOfferModalOpen(false)
      getData()
    }

    if(jobOffers==null)
        return(<span className="loading loading-spinner loading-md text-blue-500"></span>)

  return (
     <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Zarządzanie ofertami pracy</h2>
      <ul className="divide-y divide-gray-300">
        {jobOffers.length === 0 && <li>Brak ofert pracy.</li>}

        {jobOffers.map((offer) => (
          <li
            key={offer.id}
            className="flex justify-between items-center py-3"
          >
            <span className="text-lg font-medium">{offer.jobTitle}</span>
            <button
              className="px-3 py-1 bg-blue-300 text-white rounded hover:bg-blue-400 transition"
              onClick={()=>{setModalOpen(true);setSelectedJobOffer(offer)}}
            >
              Manage
            </button>
          </li>
        ))}
        <button 
        className="px-3 py-2 m-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={()=>{setAddJobOfferModalOpen(true)}}
        >Add offer</button>
      </ul>
      {modalOpen && selectedJobOffer && (<JobOfferManagementModal onClose={handleClose} JobOfferData={selectedJobOffer}/>)};
      {addJobOfferModalOpen &&(<AddJobOfferModal onClose={handleCloseAddOfferModal}/>)}
    </div>
  )
}

export default JobOfferManagement