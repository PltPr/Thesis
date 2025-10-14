import { assignTestToAppApi, getCv, rejectApp } from 'Api/ApplicationService';
import { AddMessage, AddNote } from 'Api/NoteMessageService';
import { Applications } from 'Models/Application';
import { Test } from 'Models/Test';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
    const [selectedTest, setSelectedTest] = useState<number | null>(null);
    const [status, setStatus] = useState(UserData.status);
    const [decision, setDecision] = useState<"none" | "accepting" | "rejecting" | "testAssigned"|"rejected">("none");
    const assignedTest = UserData ? TestsList.find(t => t.id == UserData.testId) : null;

    const { register, handleSubmit, formState: { errors } } = useForm<NoteMessage>({
        defaultValues: { noteContent: "", messageContent: "" }
    })

    const sendNoteMessage = async (form: NoteMessage) => {
        try {
            if (form.noteContent.trim()) {
                await AddNote(UserData.id,form.noteContent)
            }
            if (form.messageContent.trim()) {
                await AddMessage(UserData.id,form.messageContent)
            }
            toast.success("Saved")
        } catch (err) {
            console.error("Something went wrong:", err)
            toast.error("Something went wrong!")
        }
    }

    useEffect(() => {
        if (UserData.testId && status === "Test assigned") {
            setDecision("testAssigned");
        }
        else if(status=="Rejected")
            setDecision("rejected")
            
    }, [UserData.testId, status])



    const assignTest = async () => {
        try {
            if (selectedTest && UserData.id) {
                const response = await assignTestToAppApi(UserData.id, selectedTest)
                setStatus("Test assigned")
                toast.success("Test assigned successfully!")
            }

        } catch (err) {
            toast.error("Something went wrong!")
            console.error(err);
        }

    }

    const handleAccept = () => {
        setDecision("accepting");
        toast.info("Application accepted. Assign a test to save decision!")
    }

    const handleReject = async () => {
        setDecision("rejecting");
        await rejectApp(UserData.id)
        setStatus("Rejected")
        toast.info("Application rejected.")
    }

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className="bg-white rounded-lg shadow-lg w-9/12 h-5/6 p-6 flex flex-col">
                <div className='flex justify-end p-2 border-b'>
                    <button onClick={onClose}
                        className='text-gray-500 hover:text-gray-700 font-bold text-xl'>
                        &times;
                    </button>
                </div>
                <div className='flex-1 m-5 grid grid-rows-2 grid-cols-2 h-full '>

                    <div className='border-b-2 border-r-2 border-gray-500  w-full h-full'>
                        <div className="rounded-md p-3 bg-gray-50 flex flex-col">
                            <h1 className='text-lg font-bold'>User data</h1>
                            <span>
                                <strong>Name:</strong> {UserData.name} {UserData.surname}
                            </span>
                            <span>
                                <strong>Opis:</strong> {UserData.description}
                            </span>
                            <span>
                                <strong>Data:</strong>{" "}
                                {new Date(UserData.date).toLocaleString("pl-PL")}
                            </span>
                            <span>
                                <strong>Plik CV:</strong> {UserData.cvFileName}

                            </span>
                            <span>
                                <button onClick={() => getCv(UserData.cvId, UserData.cvFileName)} className="bg-blue-600 rounded-sm">
                                    Download CV
                                </button>
                            </span>
                            <span>
                                <strong>Status:</strong> {status}
                            </span>
                        </div>
                    </div>
                    {decision == "testAssigned" && assignedTest && (
                        <div className='border-b-2 border-gray-500  w-full h-full flex flex-col'>
                            Test przypisany
                            <div>
                                <h1>{assignedTest.tittle}</h1>
                                <div>Desc: {assignedTest.description}</div>
                                <div>Task Numbers: {assignedTest.taskIds?.join(", ")}</div>
                                <div>Assign Test Date: {new Date(UserData.assignTestDate).toLocaleString("pl-PL")}</div>
                            </div>
                        </div>
                    )}
                    {decision == "none" && (
                        <div className='border-b-2 border-gray-500  w-full h-full flex justify-around items-center'>
                            <button
                                onClick={handleAccept}
                                className="bg-green-500 text-white px-6 py-2 h-1/3 rounded-md hover:bg-green-600"
                            >
                                Assign a test
                            </button>
                            <button
                                onClick={handleReject}
                                className="bg-red-500 text-white px-6 py-2 h-1/3 rounded-md hover:bg-red-600"
                            >
                                Reject application
                            </button>
                        </div>
                    )}

                    {decision == "accepting" && (
                        <div className='border-b-2 border-gray-500  w-full h-full flex flex-col'>
                            <h1 className='text-lg font-bold'>Assign test</h1>
                            <div className='flex-1 overflow-y-auto pr-2'>

                                {TestsList.map((test) => (
                                    <div key={test.id} onClick={() => setSelectedTest(test.id)}
                                        className={`p-3 m-3 cursor-pointer border border-2 rounded-md gap-5
                                ${selectedTest === test.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-200 bg-gray-50'}`}>
                                        <h1>{test.tittle}</h1>
                                        <div>Desc: {test.description}</div>
                                    </div>
                                ))}

                            </div>
                            <div className='flex justify-center'>
                                <button className="bg-blue-400 w-1/2 hover:bg-blue-500 disabled:bg-gray-300" onClick={assignTest} disabled={!selectedTest}>Assign</button>
                            </div>

                        </div>
                    )}
                    {(decision == "rejecting" || decision=="rejected") && (
                        <div className='border-b-2 border-gray-500  w-full h-full flex flex-col'>
                            Application rejected
                        </div>
                    )}


                    <div className='border-r-2 border-gray-500 w-full h-full'>
                        <h1 className='text-lg font-bold'>Job offer data</h1>

                        <div>

                        </div>

                    </div>
                    <div className=' w-full h-full'>
                        {decision == "rejecting" && (
                            <div>
                                <form onSubmit={handleSubmit(sendNoteMessage)}>
                                    <div className='flex flex-col'>
                                    <h1 className=''>Add message</h1>
                                    <input {...register("messageContent")}
                                    placeholder='Message'
                                    className='border border-2 border-black'>
                                    {errors.messageContent&&(
                                        <p className="text-red-500">{errors.messageContent.message}</p>
                                    )}
                                    </input>
                                    <h1 className=''>Add note</h1>
                                    <input {...register("noteContent")}
                                    placeholder='Note'
                                    className='border border-2 border-black'>
                                        {errors.messageContent&&(
                                            <p className="text-red-500">{errors.messageContent.message}</p>
                                        )}
                                    </input>

                                    <button type="submit" className='bg-blue-500 mt-5 hover:bg-blue-600'>Send</button>
                                    </div>
                                </form>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ApplicationDetailModal