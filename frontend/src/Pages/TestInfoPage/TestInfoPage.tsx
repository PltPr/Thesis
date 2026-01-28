import { getTestByIdApi, startTestApi } from 'Api/TestService';
import { Test } from 'Models/Test'
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { taskItem } from 'Models/Task';

type Props = {
}

const TestInfoPage = (props: Props) => {
  const [test, setTest] = useState<Test | null>(null)
  const { appId,testId } = useParams<{ appId:string,testId: string }>();
  


  useEffect(() => {
    const getTest = async () => {
      try {
        const testData = await getTestByIdApi(Number(testId))
        if (testData) setTest(testData);
      } catch (err) {
        console.error("GetTestError: ", err)
      }
      
    }
    getTest()
  },[testId])

  const startTest = async()=>{
    try{
      await startTestApi(Number(appId))
    }catch(err){
      console.error("StartTestError: ",err)
    }
  }
  if(!test)
    return (
      <div className="flex items-start h-64 m-5 min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white p-6">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          {test?.tittle}
        </h1>
        <p className="text-gray-700 text-lg mb-6 text-center">
          {test?.description}
        </p>

        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex justify-between items-center mt-6 ">
          <div className=''>
            <p className="text-gray-600">
              Number of tasks:{" "}
              <span className="font-semibold text-gray-800">
                {test?.taskIds?.length || 0}
              </span>
            </p>
          
            <p className="text-gray-600">
              Duration time: {" "}
              <span className="font-semibold text-gray-800">
                {test?.totalDurationMinutes} minutes
              </span>
            </p>
          </div>

          <Link to={`/solve-test-page/${appId}/${testId}`}>
            <button onClick={startTest} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition duration-200">
              Start Test
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default TestInfoPage