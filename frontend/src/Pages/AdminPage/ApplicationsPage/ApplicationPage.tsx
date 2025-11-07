import { getCv, getGroupedApplications } from 'Api/ApplicationService'
import { getAllTestsApi } from 'Api/TestService'
import { applicationModel, Applications, GroupedApplications } from 'Models/Application'
import { Test } from 'Models/Test'
import ApplicationDetailModal from 'Modules/AdminPage/ApplicationDetailModal'
import React, { useEffect, useState } from 'react'

type Props = {}

const ApplicationPage = (props: Props) => {
  const [grApp, setGrApp] = useState<GroupedApplications[]>([])
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedApp, setSelectedApp] = useState<Applications | null>(null);
  const [testList,setTestList] =useState<Test[]>([]);

  
    const getData = async () => {
      const grapp = await getGroupedApplications()
      if (grapp) setGrApp(grapp);
      const tests = await getAllTestsApi()
      if(tests) setTestList(tests);
    }
    useEffect(()=>{
      getData()
    },[])
 


  return (
    <>
      <div className="p-4 space-y-6">
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