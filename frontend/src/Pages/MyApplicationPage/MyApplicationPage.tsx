import { getCv, getMyApplications } from 'Api/ApplicationService'
import { applicationModel } from 'Models/Application'
import React, { useEffect, useState } from 'react'

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
    console.log(applications);

    return (
        <div>
            {applications.map((app) => (
                <div className="m-5 p-5 border border-black">
                    <h1>{app.jobOfferTitle}</h1>
                    <h1>{app.description}</h1>
                    <h1>{app.status}</h1>
                    <h1>
                        {new Date(app.date).toLocaleString('pl-PL', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</h1>
                    <button onClick={()=>getCv(app.cvId,app.cvFileName)} className ="bg-blue-600 rounded-sm">Download CV: {app.cvFileName} </button>

                </div>
            ))}
        </div>
    )
}

export default MyApplicationPage