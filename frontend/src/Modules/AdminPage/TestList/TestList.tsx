import { Test } from 'Models/Test'
import React from 'react'

interface Props  {
    data:Test[]
}

const TestList = ({ data }: Props) => {
  return (
    <div className="space-y-4">
      {data.map((test) => (
        <div
          key={test.id}
          className="
            p-4 
            rounded-lg 
            border 
            border-gray-300 
            bg-gray-50 
            shadow-sm
            hover:shadow-md
            hover:border-blue-400
            transition
          "
        >
          <h1 className="text-lg font-semibold text-gray-800">
            {test.tittle}
          </h1>

          <div className="mt-2 text-gray-700">
            <p><strong>Description:</strong> {test.description}</p>
            <p><strong>Tasks:</strong> {test.taskIds?.join(", ")}</p>
            <p><strong>Duration:</strong> {test.totalDurationMinutes} min</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default TestList