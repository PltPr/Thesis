import { taskItem } from 'Models/Task'
import React from 'react'

interface Props {
    data:taskItem[]
}

const TaskList = ({ data }: Props) => {
  return (
    <div className="space-y-4">
      {data.map((task) => (
        <div
          key={task.id}
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
            Task #{task.id}
          </h1>

          <div className="mt-2 text-gray-700 space-y-1">
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Expected:</strong> {task.expectedOutput}</p>
            <p><strong>Duration:</strong> {task.durationMinutes} min</p>
          </div>
        </div>
      ))}
    </div>
  );
};


export default TaskList