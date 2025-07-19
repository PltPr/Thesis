import { taskItem } from 'Models/Task'
import React from 'react'

interface Props {
    data:taskItem[]
}

const TaskList = ({data}: Props) => {
  return (
    <div >
        {data.map((task)=>(
            <div className="p-3 m-3 border border-2 " key={task.id}>
                <h1>Desc: {task.description}</h1>
                <h1>Output: {task.expectedOutput}</h1>
            </div>
        ))}
    </div>
  )
}

export default TaskList