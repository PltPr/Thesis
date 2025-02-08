import React, { JSX } from 'react'
import './Card.css'

interface Props {
  job_tittle: string;
  job_type: string;
  salary: number;
  programming_language: string;
}

const Card: React.FC<Props> = ({ job_tittle, job_type, salary, programming_language }: Props): JSX.Element => {
  return (
    <>
      <div className="card card-1">
        <div className="work-rate">
          <p>{programming_language}</p>
          <p>${salary} / hr</p>
        </div>
        <div className="pos-nd-loc">
          <p className="job-title">{job_tittle}</p>
          <p className="job-type">{job_type}</p>
        </div>
        <div className="tags">
          <button>UI</button>
          <button>UX</button>
          <button>illustrator</button>
          <button>web design</button>
          <button>+4</button>
        </div>
        <p className="job-desc">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut saepe expedita similique quasi molestias quis! Nisi incidunt provident doloribus et!
        </p>
        <button className="button"><span>Button</span><span>&#11166;</span></button>
      </div>
    </>
  )
}

export default Card