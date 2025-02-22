import React, { JSX, useEffect, useState } from 'react'
import Card from '../Card/Card.tsx'
import './CardList.css'
import { JobOfferGet } from '../../Models/JobOffers.ts'
import { getJobOffersApi } from '../../Api/JobOfferServices.tsx'


const CardList : React.FC = () : JSX.Element => {
  const[jobOffer,setJobOffer]=useState<JobOfferGet[]>([]);

  useEffect(()=>{
    const getData=async()=>{
      const value = await getJobOffersApi()
      if(value){
        setJobOffer(value);
      }
    };
    getData();
  },[]);

  return (
    <div className='card-list'>
    {jobOffer.map((offer)=>(
      <Card key={offer.id} jobOffer={offer}/>
    ))}
    
    </div>
  )
}

export default CardList