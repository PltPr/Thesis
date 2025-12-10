import { getClassificationApi } from 'Api/ApplicationService';
import { CalendarCheck2, Info, XCircle } from 'lucide-react';
import { Applications, GroupedClassification } from 'Models/Application';
import ClassificationDetailModal from 'Modules/AdminPage/ClassificationDetailModal';
import React, { useEffect, useState } from 'react';

type Props = {};

const ClassificationPage = (props: Props) => {
  const [classifications, setClassifications] = useState<GroupedClassification[]>();
  const [showModal,setShowModal]=useState<boolean>(false);
  const[selectedAppId,setSelectedAppId]=useState<number|null>(null)     

  const getData = async ()=>{
    const classificationData = await getClassificationApi();
      if (classificationData) setClassifications(classificationData);
  }
  useEffect(() => {
    getData();
  }, []); 

  const handleClose = async()=>{
    try{
      setShowModal(false);
      await getData();
    }catch(err){

    }
  }


  return (
    <>
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Classification Results</h1>

      {!classifications && (
        <p className="text-gray-500">Loading classification...</p>
      )}

      {classifications?.map((group, idx) => (
        <div
          key={idx}
          className="border rounded-lg bg-gray-50 p-4 mb-6 shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-3">{group.jobTitle}</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-3 py-2 text-left"></th>
                <th className="border px-3 py-2 text-left">First Name</th>
                <th className="border px-3 py-2 text-left">Last Name</th>
                <th className="border px-3 py-2 text-left">Score</th>
                
              </tr>
            </thead>
            <tbody>
              {group.applications.map((a, i) => (
                <tr key={i} className="">
                  <td className="border px-3 py-2 w-3 text-center align-middle">
                    {a.status=="Test evaluated" &&
                    (<Info className='text-blue-700 inline-block'/>)}
                    {a.status=="Interview" &&
                    (<CalendarCheck2 className='text-green-600 inline-block'/>)}
                    {a.status=="Rejected" &&
                    (<XCircle className=" text-red-600 inline-block" />)}
                  </td>
                  <td className="border px-3 py-2">{a.firstName}</td>
                  <td className="border px-3 py-2">{a.lastName}</td>
                  <td className="border px-3 py-2">{a.evaluationScore.toFixed(2)}</td>

                    <div className='flex items-center '>
                      <button className='bg-blue-500' 
                      onClick={()=>{
                        setSelectedAppId(a.applicationId)
                        setShowModal(true)}
                      }
                      
                      >Details</button>
                    </div>
                    
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
    {showModal &&selectedAppId &&(<ClassificationDetailModal onClose={ handleClose} AppId={selectedAppId}/>)}
    </>
  );
};

export default ClassificationPage;
