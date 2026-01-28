import { getClassificationApi } from 'Api/ApplicationService';
import { CalendarCheck2, Info, XCircle } from 'lucide-react';
import { GroupedClassification } from 'Models/Application';
import ClassificationDetailModal from 'Modules/AdminPage/ClassificationDetailModal';
import React, { useEffect, useState } from 'react';

const ClassificationPage = () => {
  const [classifications, setClassifications] = useState<GroupedClassification[]>();
  const [showModal, setShowModal] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<number | null>(null);

  const getData = async () => {
    const classificationData = await getClassificationApi();
    if (classificationData) setClassifications(classificationData);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClose = async () => {
    setShowModal(false);
    await getData();
  };



  return (
    <>
      <div className="p-6 max-w-6xl mx-auto bg-gradient-to-b from-blue-50 to-white min-h-screen rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Classification Results</h1>

        {!classifications && (
          <div className="flex items-start h-64 m-5 min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-white p-6">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
        )}

        {classifications?.map((group, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded-2xl bg-white p-6 mb-8 shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">{group.jobTitle}</h2>

            <table className="w-full border-collapse table-auto">
              <thead>
                <tr className="bg-blue-100 text-gray-700 uppercase text-sm font-semibold">
                  <th className="border px-4 py-3 w-12 text-center">Status</th>
                  <th className="border px-4 py-3 text-left">First Name</th>
                  <th className="border px-4 py-3 text-left">Last Name</th>
                  <th className="border px-4 py-3 text-right">Score</th>
                  <th className="border px-4 py-3 w-24 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {group.applications.map((a, i) => (
                  <tr
                    key={i}
                    className="hover:bg-blue-50 transition cursor-pointer"
                  >
                    <td className="border px-4 py-3 text-center align-middle">
                      {a.status === "Test evaluated" && (
                        <Info className="text-blue-600 inline-block w-6 h-6 mx-auto" />
                      )}
                      {a.status === "Interview" && (
                        <CalendarCheck2 className="text-green-600 inline-block w-6 h-6 mx-auto" />
                      )}
                      {a.status === "Rejected" && (
                        <XCircle className="text-red-600 inline-block w-6 h-6 mx-auto" />
                      )}
                    </td>
                    <td className="border px-4 py-3 align-middle">{a.firstName}</td>
                    <td className="border px-4 py-3 align-middle">{a.lastName}</td>
                    <td className="border px-4 py-3 text-right align-middle font-mono">{a.evaluationScore.toFixed(2)}</td>
                    <td className="border px-4 py-3 text-center align-middle">
                      <button
                        onClick={() => {
                          setSelectedAppId(a.applicationId);
                          setShowModal(true);
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {showModal && selectedAppId && (
        <ClassificationDetailModal onClose={handleClose} AppId={selectedAppId} />
      )}
    </>
  );
};

export default ClassificationPage;
