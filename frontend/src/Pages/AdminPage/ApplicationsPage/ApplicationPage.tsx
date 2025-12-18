import { getGroupedApplications, getCv } from 'Api/ApplicationService'
import { getJobOffersTitles } from 'Api/JobOfferServices'
import { getAllTestsApi } from 'Api/TestService'
import { ApplicationQuery, GroupedApplications, Applications } from 'Models/Application'
import { Test } from 'Models/Test'
import ApplicationDetailModal from 'Modules/AdminPage/ApplicationDetailModal'
import React, { useEffect, useState } from 'react'

const ApplicationPage = () => {
  const [grApp, setGrApp] = useState<GroupedApplications[]>([])
  const [showModal, setShowModal] = useState(false)
  const [selectedApp, setSelectedApp] = useState<Applications | null>(null)
  const [testList, setTestList] = useState<Test[]>([])
  const [jobOfferTitles, setJobOfferTitles] = useState<string[]>([])
  const [jobTitleQuery, setJobTitleQuery] = useState<string | null>(null)
  const [statusQuery, setStatusQuery] = useState<string | null>(null)

  const getData = async () => {
    const query: ApplicationQuery = {
      jobTitle: jobTitleQuery || undefined,
      status: statusQuery || undefined
    }

    const grapp = await getGroupedApplications(query)
    if (grapp) setGrApp(grapp)

    const tests = await getAllTestsApi()
    if (tests) setTestList(tests)

    const jobTitles = await getJobOffersTitles()
    if (jobTitles) setJobOfferTitles(jobTitles)
  }

  useEffect(() => {
    getData()
  }, [jobTitleQuery, statusQuery])

  return (
    <>
      <div className="p-6 space-y-8">

        {/* Filters */}
        <div className="flex gap-4">

          <select
            value={jobTitleQuery ?? ""}
            onChange={(e) => setJobTitleQuery(e.target.value)}
            className="
              w-1/5
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-700
              shadow-sm
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-300
              transition
            "
          >
            <option value="" disabled>JobTitles</option>
            <option value="">All</option>
            {jobOfferTitles.map((title) => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>

          <select
            value={statusQuery ?? ""}
            onChange={(e) => setStatusQuery(e.target.value)}
            className="
              w-1/5
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-700
              shadow-sm
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-300
              transition
            "
          >
            <option value="" disabled>Status</option>
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Test assigned">Test assigned</option>
            <option value="Test completed">Test completed</option>
            <option value="Test evaluated">Test evaluated</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
          </select>

        </div>

        {/* Applications */}
        {grApp.map((offer, idx) => (
          <div 
            key={idx} 
            className="rounded-xl bg-white border border-gray-200 shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {offer.jobOfferTitle}
            </h2>

            <ul className="space-y-4">
              {offer.applications.map((app) => (
                <li
                  key={app.cvId}
                  className="
                    p-4
                    rounded-lg
                    border
                    bg-gray-50
                    flex
                    justify-between
                    items-center
                    hover:shadow-md
                    transition
                  "
                >

                  <div className="space-y-1 text-gray-700">
                    <p><strong>Name:</strong> {app.name} {app.surname}</p>
                    <p><strong>Opis:</strong> {app.aboutYourself}</p>
                    <p><strong>Data:</strong> {new Date(app.date).toLocaleString("pl-PL")}</p>
                    <p><strong>Status:</strong> {app.status}</p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedApp(app)
                      setShowModal(true)
                    }}
                    className="
                      px-4
                      py-2
                      rounded-lg
                      bg-blue-600
                      text-white
                      font-medium
                      shadow
                      hover:bg-blue-700
                      transition
                    "
                  >
                    Details
                  </button>

                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* Modal */}
      {showModal && selectedApp && (
        <ApplicationDetailModal
          TestsList={testList}
          UserData={selectedApp}
          onClose={async () => {
            setShowModal(false)
            setSelectedApp(null)
            await getData()
          }}
        />
      )}
    </>
  )
}

export default ApplicationPage
