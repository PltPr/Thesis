import React, { JSX } from 'react'
import './Card.css'
import { JobOfferGet } from '../../Models/JobOffers';

interface Props {
  jobOffer:JobOfferGet;
}

const Card: React.FC<Props> = ({ jobOffer }: Props): JSX.Element => {
  return (
    <>
      <div className="card card-1">
        <div className="work-rate">
          <p>{jobOffer.programmingLanguage}</p>
          <p>${jobOffer.salary} / hr</p>
        </div>
        <div className="pos-nd-loc">
          <p className="job-tittle">{jobOffer.jobTitle}</p>
          <p className="job-type">{jobOffer.jobType}</p>
        </div>



        <div className="tags">
          <button>UI</button>
          <button>UX</button>
          <button>illustrator</button>
          <button>web design</button>
          <button>+4</button>
        </div>

        
        
        <button className="button"><span>Details</span><span>&#11166;</span></button>
      </div>
    </>
  )
}

export default Card