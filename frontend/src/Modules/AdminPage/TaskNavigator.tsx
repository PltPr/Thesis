import { TaskWithSolution } from "Models/Task";
import { useState, useEffect } from "react";

const TaskNavigator = ({
    solutions,
    onTaskChange
}: {
    solutions: TaskWithSolution[];
    onTaskChange: (taskId: number, index: number) => void;
}) => {

    const [index, setIndex] = useState(0);
    const task = solutions[index];

    const prev = () => setIndex((i) => (i > 0 ? i - 1 : i));
    const next = () => setIndex((i) => (i < solutions.length - 1 ? i + 1 : i));

    useEffect(() => {
        onTaskChange(task.codeSubmissionId, index);
    }, [index]);

    return (
        <div className="flex flex-col flex-1 border rounded-lg shadow-sm bg-gray-50 p-4">
            <div className="flex justify-between items-center mb-3">
                <button
                    onClick={prev}
                    disabled={index === 0}
                    className={`px-3 py-1 rounded ${index === 0 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    ←
                </button>
                <span className="font-semibold text-gray-700">
                    Task {index + 1} / {solutions.length}
                </span>
                <button
                    onClick={next}
                    disabled={index === solutions.length - 1}
                    className={`px-3 py-1 rounded ${index === solutions.length - 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                    →
                </button>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto">
                <p><strong>Description:</strong> {task.taskDescription}</p>
                <p><strong>Expected Output:</strong> {task.taskExpectedOutput}</p>
                <p><strong>Compilation Result:</strong> {task.compilationResult}</p>
                <p><strong>Execution Result:</strong> {task.executionResult}</p>
                <p><strong>Submission Date:</strong> {new Date(task.submissionDate).toLocaleString("pl-PL")}</p>

                <div className="mt-2">
                    <strong>Code:</strong>
                    <pre className="bg-black text-green-400 p-2 rounded mt-1 overflow-x-auto">
                        {task.code || "// No code submitted"}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default TaskNavigator;
