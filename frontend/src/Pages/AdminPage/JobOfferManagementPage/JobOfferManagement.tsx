import { getJobOffersApi } from 'Api/JobOfferServices'
import { JobOfferGet } from 'Models/JobOffers'
import React, { useEffect, useState } from 'react'

type Props = {}

const JobOfferManagement = (props: Props) => {
    const[jobOffers,setJobOffers]=useState<JobOfferGet[]|null>(null)

    useEffect(()=>{
        const getData = async()=>{
            try{
                const jobOfferData= await getJobOffersApi()
                if(jobOfferData)setJobOffers(jobOfferData)
            }catch(err){

            }
        }; getData()
    },[])

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
            >
              Manage
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default JobOfferManagement