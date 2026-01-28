import { addAppEvaluationApi, assignTestToAppApi, getAppEvaluationApi, getCv, rejectApp } from 'Api/ApplicationService';
import { addEvaluationForSolutionApi, getSolutionForAllTasks } from 'Api/TaskService';
import { Applications } from 'Models/Application';
import { TaskWithSolution } from 'Models/Task';
import { Test } from 'Models/Test';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TaskNavigator from './TaskNavigator';
import { JobOfferGet } from 'Models/JobOffers';
import { GetJobOfferByAppId, GetJobOfferById} from 'Api/JobOfferServices';

type Props = {
  UserData: Applications;
  TestsList: Test[];
  onClose: () => void;
};

type NoteMessage = {
  noteContent: string;
  messageContent: string;
};

type ApplicationEvaluation = {
  appId: number;
  userExperienceScore: number;
  criteriaMatchScore: number;
  technicalSkillScore: number;
  educationScore: number;
  recruiterNote: string;
};

const ApplicationDetailModal = ({ onClose, UserData, TestsList }: Props) => {
  const [activeTab, setActiveTab] = useState<'rate' | 'assign' | 'evaluate'>('rate')

  const [selectedTest, setSelectedTest] = useState<number | null>(null);
  const [status, setStatus] = useState(UserData.status);
  const [decision, setDecision] = useState<"none" | "testAssigned" | "rejected" | "testEvaluating">("none");
  const assignedTest = UserData ? TestsList.find(t => t.id == UserData.testId) : null;
  const [solutionForAllTasks, setSolutionForAllTasks] = useState<TaskWithSolution[] | null>(null);

  const [jobOffer, setJobOffer] = useState<JobOfferGet | null>(null);
  const [isLoadingJobOffer, setIsLoadingJobOffer] = useState<boolean>(false);
  const handleClose = () => {
    setActiveTab("rate");
    onClose();
  };

  // ⭐ RATING USER
  const [rating, setRating] = useState({
    userExperience: 0,
    criteriaMatch: 0,
    technicalSkill: 0,
    education: 0,
  });
  const [recruiterNote, setRecruiterNote] = useState("");
  const [existingEvaluation, setExistingEvaluation] = useState<ApplicationEvaluation | null>(null);
  const [isLoadingEvaluation, setIsLoadingEvaluation] = useState(false);

  // ⭐ RATING TASKS
  const [currentSubmissionId, setCurrentSubmissionId] = useState<number | null>(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [taskRating, setTaskRating] = useState(0);



  // ⭐ SAVE TASK EVALUATION
  const saveTaskEvaluation = async () => {
    if (!currentSubmissionId) return toast.error("No task selected!");
    if (taskRating === 0) {
      toast.warn("Select a rating before saving");
      return;
    }

    try {
      await addEvaluationForSolutionApi(currentSubmissionId, taskRating);
      toast.success("Task evaluated!");

      // Aktualizujemy lokalnie ocenę dla aktualnego zadania:
      setSolutionForAllTasks((prev) => {
        if (!prev) return prev;

        const newSolutions = [...prev];
        newSolutions[currentTaskIndex] = {
          ...newSolutions[currentTaskIndex],
          evaluation: taskRating,  // tutaj aktualizacja oceny
        };
        return newSolutions;
      });
    } catch (err) {
      toast.error("Failed to save task evaluation");
      console.error(err);
    }
  };

  const fetchJobOffer = async () => {
    console.log(UserData.id)
    try {
      setIsLoadingJobOffer(true)
      const data = await GetJobOfferByAppId(UserData.id);
      if (data) setJobOffer(data);
    } catch (err) {
      
    } finally {
      setIsLoadingJobOffer(false)
    }
  }

  // ⭐ CHANGE TASK + LOAD EXISTING EVALUATION
  const handleTaskChange = (taskId: number, index: number) => {
    setCurrentSubmissionId(taskId);
    setCurrentTaskIndex(index);

    const evaluation = solutionForAllTasks?.[index]?.evaluation ?? 0;
    setTaskRating(evaluation);
  };


  // ⭐ FETCH EXISTING APPLICATION EVALUATION
  const fetchExistingEvaluation = async () => {
    try {
      setIsLoadingEvaluation(true);
      const data = await getAppEvaluationApi(UserData.id);
      if (data) {
        setExistingEvaluation(data);
        setRating({
          userExperience: data.userExperienceScore,
          criteriaMatch: data.criteriaMatchScore,
          technicalSkill: data.technicalSkillScore,
          education: data.educationScore,
        });
        setRecruiterNote(data.recruiterNote);
      }
    } catch (err) {
      console.error("Error fetching evaluation:", err);
    } finally {
      setIsLoadingEvaluation(false);
    }
  };


  // ⭐ SAVE APPLICATION EVALUATION
  const saveEvaluation = async () => {
    if (existingEvaluation) {
      toast.info("This application is already evaluated.");
      return;
    }

    try {
      const evaluationData = {
        appId: UserData.id,
        userExperienceScore: rating.userExperience,
        criteriaMatchScore: rating.criteriaMatch,
        technicalSkillScore: rating.technicalSkill,
        educationScore: rating.education,
        recruiterNote,
      };

      const createdEvaluation = await addAppEvaluationApi(evaluationData);

      if (createdEvaluation) {
        setExistingEvaluation(createdEvaluation);
        setRating({
          userExperience: createdEvaluation.userExperienceScore,
          criteriaMatch: createdEvaluation.criteriaMatchScore,
          technicalSkill: createdEvaluation.technicalSkillScore,
          education: createdEvaluation.educationScore,
        });
        setRecruiterNote(createdEvaluation.recruiterNote);
        toast.success("Evaluation saved successfully!");
      }
    } catch (err) {
      console.error("Evaluation error:", err);
      toast.error("Failed to save evaluation!");
    }
  };


  // ⭐ LOAD TASK SOLUTIONS
  const getTasksWithSolutions = async () => {
    try {
      const tasksData = await getSolutionForAllTasks(UserData.id);

      if (tasksData) {
        setSolutionForAllTasks(tasksData);

        // Auto select first task and load rating
        if (tasksData.length > 0) {
          setCurrentTaskIndex(0);
          setCurrentSubmissionId(tasksData[0].codeSubmissionId);
          setTaskRating(tasksData[0].evaluation ?? 0);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not load task solutions");
    }
  };


  // ⭐ STATUS HANDLING
  useEffect(() => {
    if (UserData.testId && status === "Test assigned") {
      setDecision("testAssigned");
    } else if (status === "Rejected") {
      setDecision("rejected");
    } else if (status === "Test completed") {
      setDecision("testEvaluating");
      getTasksWithSolutions();
    }
  }, [UserData.testId, status]);


  // ⭐ ASSIGN TEST
  const assignTest = async () => {
    if (!existingEvaluation) {
      toast.warn("Please evaluate the candidate before assigning a test.");
      return;
    }

    if (UserData.testId) {
      toast.info("A test has already been assigned to this candidate.");
      return;
    }

    try {
      if (selectedTest) {
        await assignTestToAppApi(UserData.id, selectedTest);
        setStatus("Test assigned");
        setDecision("testAssigned");
        UserData.testId = selectedTest;
        toast.success("Test assigned successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };


  const handleReject = async () => {
    if (status === "Rejected") return;

    try {
      setDecision("rejected");
      setStatus("Rejected");
      UserData.status = "Rejected";

      await rejectApp(UserData.id);

      toast.info("Application rejected.");
    } catch (err) {
      toast.error("Failed to reject application");
      console.error(err);
    }
  };



  // ⭐ TAB CHANGE EFFECT
  useEffect(() => {
    if (activeTab === "evaluate") {
      getTasksWithSolutions();
      setDecision("testEvaluating");
    }
    if (activeTab === "rate") {
      fetchExistingEvaluation();
      fetchJobOffer();
    }
  }, [activeTab]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* ZMIANA 1: Ustawiona wysokość, dodany flex i flex-col */}
      <div className="bg-white rounded-xl w-11/12 max-w-6xl h-[90vh] shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        {/* ZMIANA 2: Nagłówek nie będzie się kurczył */}
        <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Application detail</h2>

            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("rate")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === "rate"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-transparent text-gray-700 border border-gray-200"
                  }`}
              >
                Rate user
              </button>
              <button
                onClick={() => setActiveTab("assign")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === "assign"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-transparent text-gray-700 border border-gray-200"
                  }`}
              >
                Assign test
              </button>
              <button
                onClick={() => setActiveTab("evaluate")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === "evaluate"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-transparent text-gray-700 border border-gray-200"
                  }`}
              >
                Evaluate test
              </button>
            </div>
          </div>

          <div>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 gap-5 p-6 flex-grow overflow-y-auto">
          {/* Left column */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-base font-semibold mb-2">User data</h3>
              <p className="text-sm">
                <span className="font-bold">Name:</span> {UserData.name} {UserData.surname}
              </p>
              <p className="text-sm">
                <span className="font-bold">About:</span> {UserData.aboutYourself}
              </p>
              <p className="text-sm">
                <span className="font-bold">Experience:</span> {UserData.similarExperience} years
              </p>
              <p className="text-sm">
                <span className="font-bold">Expected salary:</span> {UserData.expectedMonthlySalary}$
              </p>
              <p className="text-sm">
                <span className="font-bold">Date:</span>{" "}
                {new Date(UserData.date).toLocaleString("pl-PL")}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-sm">
                  <span className="font-bold">CV:</span> {UserData.cvFileName}
                </p>
                <button
                  onClick={() => getCv(UserData.cvId, UserData.cvFileName)}
                  className="ml-2 btn btn-sm btn-primary"
                >
                  Download CV
                </button>
              </div>
              <p className="mt-2 text-sm">
                <span className="font-bold">Status:</span> {status}
              </p>
            </div>

            {/* --- RATE TAB --- */}
            {activeTab === "rate" && (
              <div className="bg-white p-6 rounded-md border border-gray-200">
                <h4 className="font-semibold mb-3 text-lg">Rate user</h4>

                {isLoadingEvaluation ? (
                  <p className="text-gray-500">Loading evaluation...</p>
                ) : (
                  <>
                    <div className="space-y-4">
                      {[
                        { label: "User Experience", key: "userExperience" },
                        { label: "Criteria Match", key: "criteriaMatch" },
                        { label: "Technical Skills", key: "technicalSkill" },
                        { label: "Education", key: "education" },
                      ].map((field) => (
                        <div key={field.key} className="flex items-center justify-between">
                          <span className="text-sm font-medium w-40">{field.label}:</span>
                          <div className="rating rating-lg">
                            {/* ZERO – musi istnieć */}
                            <input
                              type="radio"
                              name={`rating-${field.key}`}
                              className="hidden"
                              checked={
                                {
                                  userExperience: rating.userExperience === 0,
                                  criteriaMatch: rating.criteriaMatch === 0,
                                  technicalSkill: rating.technicalSkill === 0,
                                  education: rating.education === 0,
                                }[field.key]
                              }
                              readOnly
                            />

                            {[1, 2, 3, 4, 5].map((num) => (
                              <input
                                key={num}
                                type="radio"
                                name={`rating-${field.key}`}
                                className="mask mask-star-2 bg-yellow-400"
                                checked={
                                  {
                                    userExperience: rating.userExperience === num,
                                    criteriaMatch: rating.criteriaMatch === num,
                                    technicalSkill: rating.technicalSkill === num,
                                    education: rating.education === num,
                                  }[field.key]
                                }
                                onChange={() =>
                                  setRating((prev) => ({ ...prev, [field.key]: num }))
                                }
                                disabled={!!existingEvaluation}
                              />
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-2">Recruiter Note</label>
                      <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Write your note"
                        value={recruiterNote}
                        onChange={(e) => setRecruiterNote(e.target.value)}
                        disabled={!!existingEvaluation}
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
                      {existingEvaluation ? (
                        <span className="text-green-600 font-medium">
                          Already evaluated ✅
                        </span>
                      ) : (
                        <button className="btn btn-primary" onClick={saveEvaluation}>
                          Save evaluation
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* --- ASSIGN TAB --- */}
            {activeTab === "assign" && (
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <h4 className="font-semibold mb-2">Assign test</h4>
                <div className="text-sm text-gray-600 mb-2">
                  Pick a test from the right panel and click Assign.
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={assignTest}
                    className="btn btn-primary p-2"
                    disabled={!selectedTest || !!UserData.testId || UserData.status === "Rejected"}
                  >
                    Assign
                  </button>
                  <button
                    onClick={handleReject}
                    className="btn btn-error bg-red-700 text-white p-2"
                    disabled={!!UserData.testId || UserData.status === "Rejected"}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}


            {/* --- EVALUATE TAB --- */}
            {activeTab === "evaluate" && (
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <h4 className="font-semibold mb-2">Evaluate test</h4>
                <p className="text-sm text-gray-600">
                  View and evaluate submitted task solutions. Use the navigator on the right to
                  browse solutions.
                </p>
                {currentSubmissionId && (
                  <div className="mt-4 border rounded p-4 bg-gray-50">
                    <h4 className="font-semibold mb-3">Evaluate task #{currentTaskIndex + 1}</h4>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-medium">Rating:</span>

                      <div className="rating rating-lg">
                        {/* ZERO */}
                        <input
                          type="radio"
                          name="task-rating"
                          className="hidden"
                          checked={taskRating === 0}
                          readOnly
                        />

                        {[1, 2, 3, 4, 5].map((num) => (
                          <input
                            key={num}
                            type="radio"
                            name="task-rating"
                            className="mask mask-star-2 bg-yellow-400"
                            checked={taskRating === num}
                            onChange={() => setTaskRating(num)}
                            disabled={!!solutionForAllTasks?.[currentTaskIndex]?.evaluation}
                          />
                        ))}
                      </div>

                    </div>

                    {/* Jeśli ocenione → pokazujemy “Already evaluated” */}
                    {solutionForAllTasks?.[currentTaskIndex]?.evaluation ? (
                      <p className="text-green-600 font-medium mt-2">Already evaluated ✅</p>
                    ) : (
                      <button className="btn btn-primary mt-3" onClick={saveTaskEvaluation}>
                        Save task evaluation
                      </button>
                    )}
                  </div>
                )}


              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="space-y-4">
            {activeTab === "assign" && (
              <div className="bg-white p-4 rounded-md border border-gray-200 h-[70vh] overflow-auto">
                <h4 className="font-semibold mb-3">Available tests</h4>

                {UserData.testId ? (
                  // Jeśli test jest przypisany – pokazujemy informację o nim
                  <div className="p-4 border rounded-md bg-gray-50">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Assigned test ID:</span>{" "}
                      {UserData.testId}
                    </p>

                    {assignedTest && (
                      <>
                        <p className="text-sm text-gray-700 mt-1">
                          <span className="font-semibold">Title:</span>{" "}
                          {assignedTest.tittle}
                        </p>
                        <p className="text-sm text-gray-600">
                          {assignedTest.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Tasks: {assignedTest.taskIds?.join(", ") || "—"}
                        </p>
                      </>
                    )}

                    <p className="text-green-700 font-medium mt-3">
                      ✅ Test already assigned
                    </p>
                  </div>
                ) : status === "Rejected" ? (
                  // Jeśli aplikacja odrzucona i nie ma testu przypisanego
                  <div className="text-red-600 font-semibold text-center mt-10">
                    Application rejected — test assignment disabled.
                  </div>
                ) : (
                  // Jeśli test NIE jest przypisany i aplikacja nie jest odrzucona – pokazujemy listę do wyboru
                  <div className="space-y-2">
                    {TestsList.map((test) => (
                      <div
                        key={test.id}
                        onClick={() => setSelectedTest(test.id)}
                        className={`p-3 rounded-md border cursor-pointer ${selectedTest === test.id
                          ? "border-blue-500 bg-blue-50 shadow"
                          : "border-gray-200 bg-white"
                          }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-semibold">{test.tittle}</h5>
                            <p className="text-sm text-gray-600">{test.description}</p>
                          </div>
                          <div className="text-sm text-gray-500">
                            {test.taskIds?.length ?? 0} tasks
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            )}
            {activeTab === "rate" && (
              <div className="bg-white p-4 rounded-md border border-gray-200 h-[70vh] overflow-auto">
                <h4 className="font-semibold mb-3">Job offer details</h4>

                {isLoadingJobOffer && (
                  <p className="text-gray-500 text-sm">Loading job offer...</p>
                )}

                {!isLoadingJobOffer && jobOffer && (
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold">Title</p>
                      <p>{jobOffer.jobTitle}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Type</p>
                      <p>{jobOffer.jobType}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Salary</p>
                      <p>{jobOffer.salary}$</p>
                    </div>

                    <div>
                      <p className="font-semibold">Main language</p>
                      <p>{jobOffer.programmingLanguage}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Description</p>
                      <p className="text-gray-600">{jobOffer.description}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Required technologies</p>
                      <ul className="list-disc list-inside text-gray-700">
                        {jobOffer.jobOfferTechnologyRequired.map((tech, idx) => (
                          <li key={idx}>{tech.name}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold">Nice to have</p>
                      <ul className="list-disc list-inside text-gray-500">
                        {jobOffer.jobOfferTechnologyNiceToHave.map((tech, idx) => (
                          <li key={idx}>{tech.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {!isLoadingJobOffer && !jobOffer && (
                  <p className="text-gray-500 text-sm">No job offer data.</p>
                )}
              </div>
            )}


            {activeTab === "evaluate" && (
              <div className="bg-white p-4 rounded-md border border-gray-200 h-[70vh] overflow-auto">
                <h4 className="font-semibold mb-3">Test evaluation</h4>

                {assignedTest && decision === "testAssigned" && (
                  <div className="mb-4 p-3 border rounded bg-gray-50">
                    <h5 className="font-medium">{assignedTest.tittle}</h5>
                    <p className="text-sm text-gray-600">{assignedTest.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Tasks: {assignedTest.taskIds?.join(", ")}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Assign date:{" "}
                      {UserData.assignTestDate
                        ? new Date(UserData.assignTestDate).toLocaleString("pl-PL")
                        : "-"}
                    </p>
                  </div>
                )}

                {(UserData.status == 'Test completed' || UserData.status == 'Test evaluated') &&
                  solutionForAllTasks &&
                  solutionForAllTasks.length > 0 &&
                  <TaskNavigator
                    solutions={solutionForAllTasks}
                    onTaskChange={handleTaskChange}
                  />
                }

                {decision === "testEvaluating" &&
                  (!solutionForAllTasks || solutionForAllTasks.length === 0) && (
                    <div className="text-gray-500">No task solutions found.</div>
                  )}

                {decision === "rejected" && (
                  <div className="text-red-500">Application rejected</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailModal;
