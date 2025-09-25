import { createTestApi } from 'Api/ApplicationService';
import { taskItem } from 'Models/Task'
import { Test } from 'Models/Test';
import React from 'react'
import { useForm } from 'react-hook-form';

type FormData={
    description:string;
    selectedTasks:number[];
}
type Props = {
    tasks:taskItem[];
    onClose:()=>void;
    onCreate:(newTest:Test)=>void;
}

const CreateTaskModal:React.FC<Props> = ({tasks,onClose,onCreate}) => {
    const{register,handleSubmit,formState:{errors}}=useForm<FormData>({
        defaultValues:{description:"",selectedTasks:[]},
    });

    const onSubmit = async(data:FormData)=>{
        try{
            const newTest = await createTestApi(data.description,data.selectedTasks)
            onCreate(newTest)
            onClose();
        }catch(err)
        {
            console.error("Failed to create test",err);
        }
    };

   return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create New Test</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Opis testu */}
          <input
            {...register("description", { required: "Description is required" })}
            placeholder="Test description"
            className="border p-2 w-full mb-4"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}

          {/* Lista tasków */}
          <h3 className="font-semibold mb-2">Select Tasks:</h3>
          <div className="max-h-64 overflow-y-auto border p-2 mb-4">
            {tasks.map((task) => (
              <div key={task.id}>
                <label>
                  <input
                    type="checkbox"
                    value={task.id}
                    {...register("selectedTasks")}
                    className="mr-2"
                  />
                  {task.id}
                  {task.description}
                  {task.expectedOutput}
                </label>
              </div>
            ))}
          </div>

          {/* Przyciski */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="bg-gray-400 p-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-700 p-2 text-white rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTaskModal