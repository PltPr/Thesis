import { getCv, getGroupedApplications } from 'Api/ApplicationService'
import { getJobOffersTitles } from 'Api/JobOfferServices'
import { getAllTestsApi } from 'Api/TestService'
import { applicationModel, ApplicationQuery, Applications, GroupedApplications } from 'Models/Application'
import { Test } from 'Models/Test'
import ApplicationDetailModal from 'Modules/AdminPage/ApplicationDetailModal'
import React, { useEffect, useState } from 'react'

type Props = {}

const ApplicationPage = (props: Props) => {
  const [grApp, setGrApp] = useState<GroupedApplications[]>([])
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedApp, setSelectedApp] = useState<Applications | null>(null);
  const [testList,setTestList] =useState<Test[]>([]);


  const[jobOfferTitles,setJobOfferTitles]=useState<string[]>([]);
  const[jobTitleQuery,setJobTitleQuery]=useState<string|null>(null);
  const[statusQuery,setStatusQuery]=useState<string|null>(null);

  
    const getData = async () => {

      const query:ApplicationQuery={
      jobTitle:jobTitleQuery || undefined,
      status:statusQuery || undefined
    }

      const grapp = await getGroupedApplications(query)
      if (grapp) setGrApp(grapp);
      const tests = await getAllTestsApi()
      if(tests) setTestList(tests);
      const jobTitles = await getJobOffersTitles();
      if(jobTitles) setJobOfferTitles(jobTitles)
    }
    useEffect(()=>{
      getData()
    },[jobTitleQuery,statusQuery])
 
    

  return (
    <>
      <div className="p-4 space-y-6">
        <select value={jobTitleQuery ?? ""}
        onChange={(e)=>setJobTitleQuery(e.target.value)}
        className="
              w-1/6
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-gray-700
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-300
              focus:outline-none
              transition
              duration-200
              ease-in-out
            ">
          <option value="" disabled>
              JobTitles
            </option>
            <option value="">All</option>
            {jobOfferTitles.map((title)=>(
              <option key={title} value={title}>{title}</option>
            ))}
        </select>

        <select
            value={statusQuery ?? ""}
            onChange={(e) => setStatusQuery(e.target.value)}
            className="
              w-1/6
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              text-gray-700
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-300
              focus:outline-none
              transition
              duration-200
              ease-in-out
            "
          >
            <option value="" disabled>
              Status
            </option>
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Test assigned">Test assigned</option>
            <option value="Test completed">Test completed</option>
            <option value="Test evaluated">Test evaluated</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            
          </select>

        {grApp.map((offer, idx) => (
          <div key={idx} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">{offer.jobOfferTitle}</h2>
            <ul className="space-y-2">
              {offer.applications.map((app) => (
                <li
                  key={app.cvId}
                  className='border flex justify-between items-center'
                >
                  <div className="rounded-md p-3 bg-gray-50 flex flex-col">
                    <span>
                      <strong>Name:</strong> {app.name} {app.surname}
                    </span>
                    <span>
                      <strong>Opis:</strong> {app.aboutYourself}
                    </span>
                    <span>
                      <strong>Data:</strong>{" "}
                      {new Date(app.date).toLocaleString("pl-PL")}
                    </span>
                   
                    <span>
                      <strong>Status:</strong> {app.status}
                    </span>
                  </div>
                  <div>
                    <button className='bg-blue-500' onClick={() => {
                      setSelectedApp(app);
                      setShowModal(true)
                    }
                    }

                    >Details</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {showModal && selectedApp && (<ApplicationDetailModal TestsList={testList} UserData={selectedApp} onClose={async() => {
        setShowModal(false)
        setSelectedApp(null)
        await getData()
      }}

      />)}
    </>
  )
}

export default ApplicationPage