import { getCv, getMyApplications } from 'Api/ApplicationService'
import { FilePlus, ClipboardCheck, Award, XCircle, Mic, BadgePlus, CirclePlus } from "lucide-react";
import { applicationModel } from 'Models/Application'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const MyApplicationPage = (props: Props) => {
  const [applications, setApplications] = useState<applicationModel[]>([])

  useEffect(() => {
    const getData = async () => {
      const response = await getMyApplications()
      if (response) setApplications(response)
    }
    getData()
  }, [])

  const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "new":
      return <CirclePlus  className="inline-block w-5 h-5 text-green-600" />;
    case "Test assigned":
      return <ClipboardCheck className="inline-block w-5 h-5 text-blue-600" />;
    case "Test evaluated":
      return <Award className="inline-block w-5 h-5 text-green-600" />;
    case "Rejected":
      return <XCircle className="inline-block w-5 h-5 text-red-600" />;
    case "Interview scheduled":
      return <Mic className="inline-block w-5 h-5 text-purple-600" />;
    default:
      return <FilePlus className="inline-block w-5 h-5 text-gray-500" />;
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Applications
      </h1>

      <div className="space-y-6">
        {applications.map(app => (
          <div
          
            key={app.id}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition-all"
          >
            {/* Nagłówek aplikacji */}
            <h2 className="text-xl font-semibold text-gray-800">
              {app.jobOfferTitle}
            </h2>

            {/* Detale */}
            <div className="mt-3 text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Description:</span>{' '}
                {app.aboutYourself}
              </p>
              <p className="flex items-center gap-2">
  <span className="font-medium">Status:</span>
  {app.status}
  <StatusIcon status={app.status} />
</p>

              <p>
                <span className="font-medium">Application Date:</span>{' '}
                {new Date(app.date).toLocaleString('pl-PL', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            {/* Guziki */}
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => getCv(app.cvId, app.cvFileName)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Download CV
              </button>

              {app.testId && app.status === 'Test assigned' && (
                <Link to={`/test-info-page/${app.id}/${app.testId}`}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                    Solve test!
                  </button>
                </Link>
              )}

              {app.testId && app.status === 'Test started' && (
                <Link to={`/solve-test-page/${app.id}/${app.testId}`}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                    Continue test solving
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyApplicationPage
