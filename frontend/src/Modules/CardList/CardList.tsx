import React, { JSX, useEffect, useState } from 'react'
import Card from '../Card/Card'
import './CardList.css'
import { JobOfferGet } from '../../Models/JobOffers'
import { getJobOffersApi } from '../../Api/JobOfferServices'


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
  console.log(jobOffer);

  return (
    
    <div className='flex-1'>
      
    {jobOffer.map((offer)=>(
      <Card key={offer.id} jobOffer={offer}/>
   ))}

   
   
    
    </div>
  )
}

export default CardList