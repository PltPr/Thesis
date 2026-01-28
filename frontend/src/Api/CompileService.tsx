import api from "./api";

export const CompileCode = async (language: string, code: string) => {
  try {
    const response = await api.post("/api/Compillator/Compile", {
      language,
      code,
    });
    return response.data;
  } catch (err) {
    console.error("CompileCodeError: ", err);
    throw err;
  }
};
