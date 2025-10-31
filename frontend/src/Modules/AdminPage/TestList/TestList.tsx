import { Test } from 'Models/Test'
import React from 'react'

interface Props  {
    data:Test[]
}

const TestList = ({data}: Props) => {
  return (
    <div className=''>
        {data.map((test)=>(
            <div key={test.id} className="p-3 m-3  border border-2 gap-5">
              <h1>{test.tittle}</h1>
                <div>Desc: {test.description}</div>
                <div>TaskNumbers: {test.taskIds?.join(", ")}</div>
                <div>TotalDuration: {test.totalDurationMinutes} minutes</div>
            </div>
        ))}
    </div>
  )
}

export default TestList