import { getClassificationApi } from 'Api/ApplicationService';
import { GroupedClassification } from 'Models/Application';
import React, { useEffect, useState } from 'react';

type Props = {};

const ClassificationPage = (props: Props) => {
  const [classifications, setClassifications] = useState<GroupedClassification[]>();

  useEffect(() => {
    const getData = async () => {
      const classificationData = await getClassificationApi();
      if (classificationData) setClassifications(classificationData);
    };
    getData();
  }, []); 

  return (
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
                <th className="border px-3 py-2 text-left">First Name</th>
                <th className="border px-3 py-2 text-left">Last Name</th>
                <th className="border px-3 py-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {group.applications.map((a, i) => (
                <tr key={i} className="hover:bg-gray-100">
                  <td className="border px-3 py-2">{a.firstName}</td>
                  <td className="border px-3 py-2">{a.lastName}</td>
                  <td className="border px-3 py-2">{a.evaluationScore.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ClassificationPage;
