import { createTestApi } from 'Api/ApplicationService';
import { taskItem } from 'Models/Task';
import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  title: string;
  description: string;
  selectedTasks: number[];
};

type Props = {
  tasks: taskItem[];
  onClose: () => void;
  onCreate: () => void;
};

const CreateTaskModal: React.FC<Props> = ({ tasks, onClose, onCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { description: '', selectedTasks: [] },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createTestApi(data.title, data.description, data.selectedTasks);
      onCreate();
      onClose();
    } catch (err) {
      console.error('Failed to create test', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Test</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              {...register('title', { required: 'Title is required' })}
              placeholder="Test Title"
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              autoFocus
            />
            {errors.title && (
              <p className="text-red-500 mt-1 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Test Description"
              rows={4}
              className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-gray-700">Select Tasks:</h3>
            <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-md p-3 space-y-3 bg-gray-50">
              {tasks.map((task) => (
                <label
                  key={task.id}
                  className="flex items-start gap-3 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    value={task.id}
                    {...register('selectedTasks')}
                    className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div className="text-gray-800">
                    <p className="font-medium">Task #{task.id}</p>
                    <p className="text-sm">{task.description}</p>
                    <p className="text-xs text-gray-500 italic">Expected output: {task.expectedOutput}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
