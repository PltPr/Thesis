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
                <div className="m-5 p-5 border border-black flex flex-col">
                    <h1>Job Tittle: {app.jobOfferTitle}</h1>
                    <h1>Description: {app.description}</h1>
                    <h1>Status: {app.status}</h1>
                    <h1>Application Date: 
                        {new Date(app.date).toLocaleString('pl-PL', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}</h1>
                    <button onClick={()=>getCv(app.cvId,app.cvFileName)} className ="bg-blue-600 rounded-sm w-1/12">Download CV</button>
                    {app.testId && app.status=="Test assigned"&&(
                        <button className="m-3 p-1 bg-green-600 hover:bg-green-700 w-1/12">Solve test!</button>
                    )}

                </div>
            ))}

        </div>
    )
}

export default MyApplicationPage