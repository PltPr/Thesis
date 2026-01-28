import api from "./api";
import { taskItem, taskItemForSolving, TaskWithSolution } from "Models/Task";

export const getAllTasks = async () => {
  try {
    const response = await api.get<taskItem[]>("/api/Task/GetAll");
    return response.data;
  } catch (err) {
    console.log("getAllTasks error: ", err);
    throw err;
  }
};

export const getTaskById = async (id: string) => {
  try {
    const response = await api.get<taskItem>(`/api/Task/${id}`);
    return response.data;
  } catch (err) {
    console.error("getTaskById error: ", err);
  }
};

export const getTasksForTest = async (testId: number) => {
  try {
    const response = await api.get<taskItem[]>(`/api/Task/GetTasksForTest?testId=${testId}`);
    return response.data;
  } catch (err) {
    console.error("getTasksForTestApi error: ", err);
  }
};

export const getTasksForTestSolution = async (appId: number) => {
  try {
    const response = await api.get<taskItemForSolving[]>(`/api/Task/GetAllTasksForSolving?appId=${appId}`);
    return response.data;
  } catch (err) {
    console.error("getTasksForTestSolution");
    throw err;
  }
};

export const addSolutionForTask = async (appId: number, taskId: number, code: string, language: string) => {
  try {
    const response = await api.post("/api/Task/AddSolutionForTask", {
      applicationId: appId,
      taskId: taskId,
      code: code,
      language: language,
    });
    return response.data;
  } catch (err) {
    console.error("addCodeForTask error: ", err);
    throw err;
  }
};

export const getSolutionForAllTasks = async (appId: number) => {
  try {
    const response = await api.get<TaskWithSolution[]>(`/api/Task/GetCodeSubmissionForAllTasks?appId=${appId}`);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("getSolutionForAllTasksError: ", err);
  }
};

export const addEvaluationForSolutionApi = async (codeSubmissionId: number, evaluation: number) => {
  try {
    const response = await api.put("/api/Task/AddEvaluationForSolution", {
      codeSubmissionId: codeSubmissionId,
      evaluation: evaluation,
    });
  } catch (err) {
    console.error("addEvaluationForSolutionApiError: ", err);
    throw err;
  }
};
