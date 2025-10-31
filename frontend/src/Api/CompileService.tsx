import axios from "axios"

export const CompileCode = async(language:string,code:string)=>{
    try{
        const response = await axios.post("http://localhost:5116/api/Compillator/Compile",{
            language:language,
            code:code
        })
        return response.data
    }catch(err){
        console.error("CompileCodeError: ",err)
        throw err;
    }
}