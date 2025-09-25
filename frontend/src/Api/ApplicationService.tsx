import axios from "axios"
import { applicationModel,GroupedApplications } from "Models/Application";

export const AddApplicationApi =async(description:string,cv:File,jobOfferId:number)=>{
    try{
        const formData = new FormData();
        formData.append("Description",description);
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


export const getGroupedApplications=async ()=>{
    try{
        const response = await axios.get<GroupedApplications[]>("http://localhost:5116/api/application/GroupedApps")
        return response.data
    }catch(err){
        console.log("GetGroupedApplications error: ",err)
        throw err;
    }
}

export const createTestApi=async(description:string, taskList:number[])=>{
    try{
        const response = await axios.post("http://localhost:5116/api/Test/CreateTest",{
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