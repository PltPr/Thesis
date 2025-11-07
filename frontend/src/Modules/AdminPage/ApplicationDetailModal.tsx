import { assignTestToAppApi, getCv, rejectApp } from 'Api/ApplicationService';
import { AddMessage, AddNote } from 'Api/NoteMessageService';
import { getSolutionForAllTasks } from 'Api/TaskService';
import { Applications } from 'Models/Application';
import { TaskWithSolution } from 'Models/Task';
import { Test } from 'Models/Test';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TaskNavigator from './TaskNavigator';


type Props = {
    UserData: Applications
    TestsList: Test[]
    onClose: () => void;
}

type NoteMessage = {
    noteContent: string;
    messageContent: string;
}

const ApplicationDetailModal = ({ onClose, UserData, TestsList }: Props) => {
    const [activeTab, setActiveTab] = useState<'rate' | 'assign' | 'evaluate'>(() => {
        if (UserData.status === 'Test completed') return 'evaluate';
        if (UserData.testId) return 'assign';
        return 'rate';
    });

    const [selectedTest, setSelectedTest] = useState<number | null>(null);
    const [status, setStatus] = useState(UserData.status);
    const [decision, setDecision] = useState<"none" | "accepting" | "rejecting" | "testAssigned" | "rejected" | "testEvaluating">("none");
    const assignedTest = UserData ? TestsList.find(t => t.id == UserData.testId) : null;
    const [solutionForAllTasks, setSolutionForAllTasks] = useState<TaskWithSolution[] | null>(null);

    // nowy stan dla oceny aplikacji
    const [rating, setRating] = useState({
        userExperience: 0,
        criteriaMatch: 0,
        technicalSkill: 0,
        education: 0,
    });
    const [recruiterMessage, setRecruiterMessage] = useState("");

    

    const saveEvaluation = async () => {
        try {
            const evaluationData = {
                userExperienceScore: rating.userExperience,
                criteriaMatchScore: rating.criteriaMatch,
                technicalSkillScore: rating.technicalSkill,
                educationScore: rating.education,
                recruiterMessage,
            };

            // tutaj możesz podpiąć swoje API np.:
            // await addEvaluationApi(UserData.id, evaluationData);

            console.log("Evaluation sent:", evaluationData);
            toast.success("Evaluation saved successfully!");
        } catch (err) {
            console.error("Evaluation error:", err);
            toast.error("Failed to save evaluation!");
        }
    };

    const { register, handleSubmit} = useForm<NoteMessage>({
        defaultValues: { noteContent: "", messageContent: "" }
    });

    const sendNoteMessage = async (form: NoteMessage) => {
        try {
            if (form.noteContent.trim()) {
                await AddNote(UserData.id, form.noteContent)
            }
            if (form.messageContent.trim()) {
                await AddMessage(UserData.id, form.messageContent)
            }
            toast.success("Saved")
        } catch (err) {
            console.error("Something went wrong:", err)
            toast.error("Something went wrong!")
        }
    };

    const getTasksWithSolutions = async () => {
        try {
            const tasksData = await getSolutionForAllTasks(UserData.id);
            if (tasksData)
                setSolutionForAllTasks(tasksData);
        } catch (err) {
            console.error(err)
            toast.error('Could not load task solutions')
        }
    }

    useEffect(() => {
        if (UserData.testId && status === "Test assigned") {
            setDecision("testAssigned");
        }
        else if (status == "Rejected")
            setDecision("rejected")
        else if (status == "Test completed") {
            setDecision("testEvaluating")
            getTasksWithSolutions();
        }

    }, [UserData.testId, status])

    const assignTest = async () => {
        try {
            if (selectedTest && UserData.id) {
                await assignTestToAppApi(UserData.id, selectedTest)
                setStatus("Test assigned")
                setDecision('testAssigned')
                toast.success("Test assigned successfully!")
            }

        } catch (err) {
            toast.error("Something went wrong!")
            console.error(err);
        }

    }

    const handleReject = async () => {
        setDecision("rejecting");
        await rejectApp(UserData.id)
        setStatus("Rejected")
        toast.info("Application rejected.")
    }

    useEffect(() => {
        if (activeTab === 'evaluate') {
            getTasksWithSolutions();
            setDecision('testEvaluating')
        }
    }, [activeTab])

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-xl w-11/12 max-w-6xl h-[86vh] shadow-xl overflow-hidden'>
                {/* Header with tabs */}
                <div className='flex items-center justify-between px-6 py-4 border-b'>
                    <div className='flex items-center gap-4'>
                        <h2 className='text-lg font-semibold'>Application detail</h2>

                        <div className='flex space-x-2'>
                            <button
                                onClick={() => setActiveTab('rate')}
                                className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === 'rate' ? 'bg-blue-600 text-white shadow' : 'bg-transparent text-gray-700 border border-gray-200'}`}>
                                Rate user
                            </button>
                            <button
                                onClick={() => setActiveTab('assign')}
                                className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === 'assign' ? 'bg-blue-600 text-white shadow' : 'bg-transparent text-gray-700 border border-gray-200'}`}>
                                Assign test
                            </button>
                            <button
                                onClick={() => setActiveTab('evaluate')}
                                className={`px-3 py-1 rounded-md text-sm font-medium ${activeTab === 'evaluate' ? 'bg-blue-600 text-white shadow' : 'bg-transparent text-gray-700 border border-gray-200'}`}>
                                Evaluate test
                            </button>
                        </div>
                    </div>

                    <div>
                        <button onClick={onClose} className='text-gray-500 hover:text-gray-700 text-2xl font-bold'>×</button>
                    </div>
                </div>

                {/* Body */}
                <div className='grid grid-cols-2 gap-5 p-6 h-[calc(86vh-72px)]'>
                    {/* Left column */}
                    <div className='space-y-4'>
                        <div className='bg-gray-50 p-4 rounded-md border border-gray-200'>
                            <h3 className='text-base font-semibold mb-2'>User data</h3>
                            <p className='text-sm'><span className='font-medium'>Name:</span> {UserData.name} {UserData.surname}</p>
                            <p className='text-sm'><span className='font-medium'>About:</span> {UserData.aboutYourself}</p>
                            <p className='text-sm'><span className='font-medium'>Experience:</span> {UserData.similarExperience}</p>
                            <p className='text-sm'><span className='font-medium'>Expected salary:</span> {UserData.expectedMonthlySalary}</p>
                            <p className='text-sm'><span className='font-medium'>Date:</span> {new Date(UserData.date).toLocaleString("pl-PL")}</p>
                            <div className='mt-2 flex items-center gap-2'>
                                <p className='text-sm'><span className='font-medium'>CV:</span> {UserData.cvFileName}</p>
                                <button onClick={() => getCv(UserData.cvId, UserData.cvFileName)} className='ml-2 btn btn-sm btn-primary'>Download CV</button>
                            </div>
                            <p className='mt-2 text-sm'><span className='font-medium'>Status:</span> {status}</p>
                        </div>

                        {/* --- RATE TAB (DaisyUI) --- */}
                        {activeTab === 'rate' && (
                            <div className="bg-white p-6 rounded-md border border-gray-200">
                                <h4 className="font-semibold mb-3 text-lg">Rate user</h4>

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
                                                {[1, 2, 3, 4, 5].map((num) => (
                                                    <input
                                                        key={num}
                                                        type="radio"
                                                        name={`rating-${field.key}`}
                                                        className="mask mask-star-2 bg-yellow-400"
                                                        aria-label={`${num} stars`}
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
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    <label className="block text-sm font-medium mb-2">Recruiter message</label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Write your message to the candidate..."
                                        value={recruiterMessage}
                                        onChange={(e) => setRecruiterMessage(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-2 mt-6">
                                    <button className="btn btn-primary" onClick={saveEvaluation}>
                                        Save evaluation
                                    </button>
                                    
                                </div>
                            </div>
                        )}

                        {/* --- ASSIGN TAB --- */}
                        {activeTab === 'assign' && (
                            <div className='bg-white p-4 rounded-md border border-gray-200'>
                                <h4 className='font-semibold mb-2'>Assign test</h4>
                                <div className='text-sm text-gray-600 mb-2'>Pick a test from the right panel and click Assign.</div>
                                <div className='flex space-x-2'>
                                    <button onClick={assignTest} className='btn btn-primary p-2' disabled={!selectedTest}>Assign</button>
                                    <button onClick={handleReject} className='btn btn-error bg-red-700 text-white p-2'>Reject</button>
                                </div>
                            </div>
                        )}

                        {/* --- EVALUATE TAB --- */}
                        {activeTab === 'evaluate' && (
                            <div className='bg-white p-4 rounded-md border border-gray-200'>
                                <h4 className='font-semibold mb-2'>Evaluate test</h4>
                                <p className='text-sm text-gray-600'>View and evaluate submitted task solutions. Use the navigator on the right to browse solutions.</p>
                            </div>
                        )}
                    </div>

                    {/* --- RIGHT COLUMN --- */}
                    <div className='space-y-4'>
                        {activeTab === 'assign' && (
                            <div className='bg-white p-4 rounded-md border border-gray-200 h-[70vh] overflow-auto'>
                                <h4 className='font-semibold mb-3'>Available tests</h4>
                                <div className='space-y-2'>
                                    {TestsList.map((test) => (
                                        <div
                                            key={test.id}
                                            onClick={() => setSelectedTest(test.id)}
                                            className={`p-3 rounded-md border cursor-pointer ${selectedTest === test.id ? 'border-blue-500 bg-blue-50 shadow' : 'border-gray-200 bg-white'}`}
                                        >
                                            <div className='flex justify-between items-start'>
                                                <div>
                                                    <h5 className='font-semibold'>{test.tittle}</h5>
                                                    <p className='text-sm text-gray-600'>{test.description}</p>
                                                </div>
                                                <div className='text-sm text-gray-500'>{test.taskIds?.length ?? 0} tasks</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'evaluate' && (
                            <div className='bg-white p-4 rounded-md border border-gray-200 h-[70vh] overflow-auto'>
                                <h4 className='font-semibold mb-3'>Test evaluation</h4>

                                {assignedTest && decision === 'testAssigned' && (
                                    <div className='mb-4 p-3 border rounded bg-gray-50'>
                                        <h5 className='font-medium'>{assignedTest.tittle}</h5>
                                        <p className='text-sm text-gray-600'>{assignedTest.description}</p>
                                        <p className='text-sm text-gray-500 mt-2'>Tasks: {assignedTest.taskIds?.join(', ')}</p>
                                        <p className='text-sm text-gray-500 mt-1'>Assign date: {UserData.assignTestDate ? new Date(UserData.assignTestDate).toLocaleString('pl-PL') : '-'}</p>
                                    </div>
                                )}

                                {decision === 'testEvaluating' && solutionForAllTasks && solutionForAllTasks.length > 0 && (
                                    <TaskNavigator solutions={solutionForAllTasks} />
                                )}

                                {decision === 'testEvaluating' && (!solutionForAllTasks || solutionForAllTasks.length === 0) && (
                                    <div className='text-gray-500'>No task solutions found.</div>
                                )}

                                {decision === 'rejected' && (
                                    <div className='text-red-500'>Application rejected</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplicationDetailModal;
