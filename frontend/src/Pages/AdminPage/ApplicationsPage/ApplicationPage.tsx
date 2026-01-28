import { getGroupedApplications, getCv } from 'Api/ApplicationService'
import { getJobOffersTitles } from 'Api/JobOfferServices'
import { getAllTestsApi } from 'Api/TestService'
import { ApplicationQuery, GroupedApplications, Applications } from 'Models/Application'
import { Test } from 'Models/Test'
import ApplicationDetailModal from 'Modules/AdminPage/ApplicationDetailModal'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const ApplicationPage = () => {
  const [grApp, setGrApp] = useState<GroupedApplications[]|null>(null)
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
  
if(!grApp)
  return (
      <div className="flex items-start h-64 m-5 min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white p-6">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );

  return (
    <>
      <div className="p-6 space-y-8 bg-gradient-to-b rounded-2xl from-blue-50 to-white min-h-screen">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={jobTitleQuery ?? ""}
            onChange={(e) => setJobTitleQuery(e.target.value || null)}
            className="
              w-48
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
              cursor-pointer
            "
          >
            <option value="" disabled>Job Titles</option>
            <option value="">All</option>
            {jobOfferTitles.map((title) => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>

          <select
            value={statusQuery ?? ""}
            onChange={(e) => setStatusQuery(e.target.value || null)}
            className="
              w-48
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
              cursor-pointer
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
        <div>
          {grApp.map((offer, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-gray-200 shadow-lg p-6"
            >
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                {offer.jobOfferTitle}
              </h2>

              <ul className="space-y-4">
                {offer.applications.map((app) => (
                  <li
                    key={app.cvId}
                    className="
                      p-5
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      flex
                      flex-col md:flex-row
                      justify-between
                      items-start md:items-center
                      hover:shadow-lg
                      transition
                      cursor-pointer
                    "
                  >
                    <div className="space-y-1 text-gray-700 flex-1">
                      <p><span className="font-semibold">Name:</span> {app.name} {app.surname}</p>
                      <p><span className="font-semibold">Description:</span> {app.aboutYourself}</p>
                      <p><span className="font-semibold">Date:</span> {new Date(app.date).toLocaleString("pl-PL")}</p>
                      <p><span className="font-semibold">Status:</span> {app.status}</p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedApp(app)
                        setShowModal(true)
                      }}
                      className="
                        mt-4 md:mt-0
                        px-5
                        py-3
                        rounded-xl
                        bg-blue-600
                        text-white
                        font-semibold
                        shadow-md
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
