import React, { JSX } from 'react'
import './Card.css'
import { JobOfferGet } from '../../Models/JobOffers';
import { Link } from 'react-router-dom';

interface Props {
  jobOffer:JobOfferGet;
}

const Card: React.FC<Props> = ({ jobOffer }: Props): JSX.Element => {
  return (
    <>
      <div className="card card-1">
        <div className="work-rate">
          <p>{jobOffer.programmingLanguage}</p>
          <p>${jobOffer.salary} </p>
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

        
        <Link to ={`/card-detail-page/${jobOffer.id}`} state={{jobOffer}} className="button">
        <span>Details</span><span>&#11166;</span>
        </Link>
      </div>
    </>
  )
}

export default Card