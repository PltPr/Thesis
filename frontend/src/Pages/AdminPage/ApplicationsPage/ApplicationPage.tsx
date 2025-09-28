import { getCv, getGroupedApplications } from 'Api/ApplicationService'
import { GroupedApplications } from 'Models/Application'
import React, { useEffect, useState } from 'react'

type Props = {}

const ApplicationPage = (props: Props) => {
  const[grApp,setGrApp]=useState<GroupedApplications[]>([])
  useEffect(()=>{
    const getData = async ()=>{
      const data = await getGroupedApplications()
      if(data) setGrApp(data);
    }
    getData() 
  },[])
  console.log(grApp);
  return (
     <div className="p-4 space-y-6">
      {grApp.map((offer, idx) => (
        <div key={idx} className="border p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">{offer.jobOfferTitle}</h2>
          <ul className="space-y-2">
            {offer.applications.map((app) => (
              <li
                key={app.cvId}
                className="border rounded-md p-3 bg-gray-50 flex flex-col"
              >
                <span>
                  <strong>Name:</strong> {app.name} {app.surname}
                </span>
                <span>
                  <strong>Opis:</strong> {app.description}
                </span>
                <span>
                  <strong>Data:</strong>{" "}
                  {new Date(app.date).toLocaleString("pl-PL")}
                </span>
                <span>
                  <strong>Plik CV:</strong> {app.cvFileName}
                  
                </span>
                <span>
                  <button onClick={()=>getCv(app.cvId,app.cvFileName)} className ="bg-blue-600 rounded-sm">
                    Download CV
                  </button>
                </span>
                <span>
                  <strong>Status:</strong> {app.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default ApplicationPage