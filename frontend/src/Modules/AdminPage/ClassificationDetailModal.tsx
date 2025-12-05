import { getAppEvaluationApi, getApplicationById, getCv } from 'Api/ApplicationService';
import { ApplicationEvaluation, Applications } from 'Models/Application';
import React, { useEffect, useState } from 'react';

type Props = {
  onClose: () => void;
  AppId: number;
};

const ClassificationDetailModal = ({ onClose, AppId }: Props) => {
  const [applicationData, setApplicationData] = useState<Applications | null>(null);
  const [applicationEvaluationData, setApplicationEvaluationData] = useState<ApplicationEvaluation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const app = await getApplicationById(AppId);
        const evalData = await getAppEvaluationApi(AppId);

        if (app) setApplicationData(app);
        console.log()
        if (evalData) setApplicationEvaluationData(evalData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [AppId]);

  const renderStars = (value: number) => (
    <div className="rating rating-lg">
      {[1, 2, 3, 4, 5].map((num) => (
        <input
          key={num}
          type="radio"
          className="mask mask-star-2 bg-yellow-400"
          checked={value === num}
          readOnly
        />
      ))}
    </div>
  );

  if (isLoading || !applicationData || !applicationEvaluationData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-11/12 max-w-6xl h-[86vh] shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Classification detail</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="grid grid-cols-2 gap-5 p-6 h-[calc(86vh-72px)] overflow-y-auto">

          {/* ⬅️ LEFT COLUMN — EXACT STYLE COPY */}
          <div className="space-y-4">

            {/* USER DATA */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-base font-semibold mb-2">User data</h3>

              <p className="text-sm"><span className="font-medium">Name:</span> {applicationData.name} {applicationData.surname}</p>
              <p className="text-sm"><span className="font-medium">About:</span> {applicationData.aboutYourself}</p>
              <p className="text-sm"><span className="font-medium">Experience:</span> {applicationData.similarExperience}</p>
              <p className="text-sm"><span className="font-medium">Expected salary:</span> {applicationData.expectedMonthlySalary}</p>
              <p className="text-sm"><span className="font-medium">Date:</span> {new Date(applicationData.date).toLocaleString("pl-PL")}</p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Status:</span> {applicationData.status}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <p className="text-sm"><span className="font-medium">CV:</span> {applicationData.cvFileName}</p>
                <button
                  onClick={() => getCv(applicationData.cvId, applicationData.cvFileName)}
                  className="ml-2 btn btn-sm btn-primary"
                >
                  Download CV
                </button>
              </div>

            </div>

            {/* EVALUATION */}
            <div className="bg-white p-6 rounded-md border border-gray-200">
              <h4 className="font-semibold mb-3 text-lg">Recruiter evaluation</h4>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium w-40">User Experience:</span>
                  {renderStars(applicationEvaluationData.userExperienceScore)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium w-40">Criteria Match:</span>
                  {renderStars(applicationEvaluationData.criteriaMatchScore)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium w-40">Technical Skills:</span>
                  {renderStars(applicationEvaluationData.technicalSkillScore)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium w-40">Education:</span>
                  {renderStars(applicationEvaluationData.educationScore)}
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-2">Recruiter Note</label>
                  <p className="text-sm text-gray-700 border p-2 rounded-md bg-gray-50 whitespace-pre-wrap">
                    {applicationEvaluationData.recruiterNote}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ➡️ RIGHT COLUMN — EMPTY */}
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationDetailModal;
