import axios from "axios"
import { ApplicationEvaluation, applicationModel,ApplicationQuery,Applications,GroupedApplications, GroupedClassification } from "Models/Application";

export const AddApplicationApi =async(aboutYourself:string,expectedMonthlySalary:string,similarExperience:string,cv:File,jobOfferId:number)=>{
    try{
        const formData = new FormData();
        formData.append("AboutYourself",aboutYourself);
        formData.append("ExpectedMonthlySalary",expectedMonthlySalary);
        formData.append("SimilarExperience",similarExperience)
        formData.append("CV",cv);
        formData.append("JobOfferId",jobOfferId.toString());

        const response = await axios.post("http://localhost:5116/api/application",formData)
        return response.data
    }catch(err)
    {
        console.log("AddApplicationApi error: ",err);
        throw err;
    }
}


export const getMyApplications =async()=>{
    try{
        const response = await axios.get<applicationModel[]>("http://localhost:5116/api/application")
        return response.data;
    }catch(err){
        console.log("getMyApplications error: ",err);
    }
    
}

export const getCv = async (id: number, fileNameFromApp: string) => {
    try {
        const response = await axios.get("http://localhost:5116/api/application/DownloadCV", {
            params: { id },
            responseType: "blob"
        });

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;

        
        const fileName = fileNameFromApp || "cv.pdf";

        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
    } catch (err) {
        console.error("getCv error:", err);
        throw err;
    }
};

const grappapi = "http://localhost:5116/api/application/GroupedApps"
export const getGroupedApplications=async (query?:ApplicationQuery)=>{
    let url = grappapi
    const params = new URLSearchParams();
    if(query?.jobTitle) params.append("jobTitle",query.jobTitle);
    if(query?.status) params.append("status",query.status);

    const queryString=params.toString();
    if(queryString)
        url+=`?${queryString}`;

    try{
        const response = await axios.get<GroupedApplications[]>(url)
        return response.data
    }catch(err){
        console.log("GetGroupedApplications error: ",err)
        throw err;
    }
}

export const createTestApi=async(tittle:string,description:string, taskList:number[])=>{
    try{
        const response = await axios.post("http://localhost:5116/api/Test/CreateTest",{
            tittle:tittle,
            description:description,
            taskIds:taskList
        })
        return response.data
    }catch(err)
    {
        console.error("CreateTestError ",err)
        throw err
    }
    
}

export const assignTestToAppApi = async(appId:number,testId:number)=>{
    try{
        const response = await axios.put("http://localhost:5116/api/application/AssignTestToApp",
            null,
            {
            params:{
                appId:appId,
                testId:testId
                }
            }
        );
        return response.data;
    }catch(err)
    {
        console.error("assignTestToApiError", err);
        throw err;
    }
}


export const rejectApp = async(appId:number)=>{
    try{
        const response = await axios.put("http://localhost:5116/api/application/RejectApp",{
            Id:appId
        })
        return response.data

    }catch(err){
        console.error("rejectAppError", err)
        throw err
    }
}

export const getAppEvaluationApi = async (appId:number)=>{
    try{
        const response = await axios.get<ApplicationEvaluation>(`http://localhost:5116/api/application/GetAppEvaluation?appId=${appId}`)
        return response.data
    }catch(err){
        console.error("getAppEvaluationError",err)
    }
}

export const addAppEvaluationApi = async (data:ApplicationEvaluation)=>{
    try{
        const response = await axios.post("http://localhost:5116/api/application/AddAppEvaluation",data)
        return response.data
    }catch(err){
        console.error("addAppEvaluationApiError: ",err)
        throw err;
    }
}

export const getClassificationApi = async()=>{
    try{
        const response = await axios.get<GroupedClassification[]>("http://localhost:5116/api/application/GetClassification")
        return response.data
    }catch(err){
        console.error("getClassificationApiError: ",err)
    }
}

export const getApplicationById = async (appId:number)=>{
    try{
        const response = await axios.get<Applications>(`http://localhost:5116/api/application/${appId}`)
        return response.data
    }catch(err)
    {
        console.error("getApplicationByIdError: ",err)
    }
}

export const inviteToInterview = async(appId:number)=>{
    try{
        const response = await axios.put(`http://localhost:5116/api/application/InviteToInterview?appId=${appId}`)
        return response.data
    }catch(err){
        console.error("inviteToInterviewError: ",err)
        throw err
    }
}
