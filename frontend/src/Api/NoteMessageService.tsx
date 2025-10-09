import axios from "axios";

export const AddNote = async (appId: number, content: string) => {
  try {
    const response = await axios.post("http://localhost:5116/api/NoteMessage/AddNote", {
      applicationId: appId,
      content: content
    });
    return response.data;
  } catch (err) {
    console.error("AddNoteError: ", err);
    throw err;
  }
};

export const AddMessage = async (appId:number,content:string)=>{
  try{
    const response = await axios.post("http://localhost:5116/api/NoteMessage/AddMessage",{
      applicationId:appId,
      content:content
    });
    return response.data
  }catch(err){
    console.error("AddMessageError: ",err)
    throw err
  }
}
