import axios from "axios";
import { JobOfferGet, JobOfferQuery, Technology } from "../Models/JobOffers";

const api ="http://localhost:5116/api/jobOffer"

export const getJobOffersApi = async (query?:JobOfferQuery) => {
    try {
        let url = api
        if(query) {
            const params = new URLSearchParams();
            if(query.jobTitle) params.append("jobTitle",query.jobTitle)
            if(query.language) params.append("language",query.language)

            const queryString = params.toString();
            if(queryString)
                    url+=`?${queryString}`;
        }
        const response = await axios.get<JobOfferGet[]>(url);
        return response.data;
        
    } catch (error) {
        console.error("Error fetching job offers:", error);
        return null;
    }
};


export const getJobOffersTitles = async()=>{
    try{
        const response = await axios.get<string[]>("http://localhost:5116/api/jobOffer/GetJobOfferTitles")
        return response.data
    }catch(err){
        console.error("getJobOfferTitlesError: ",err)
    }
}

export const DeleteTechnologyFromJobOffer = async (offerId:number,technology:string,type:string)=>{
    try{
        const response = await axios.delete("http://localhost:5116/api/jobOffer/DeleteTechnologyFromOffer",{
            data:
            {
                jobOfferId:offerId,
                technologyName:technology,
                type:type
            }
        })
    }catch(err){
        console.error("DeleteTechnologyFromJobOfferError: ",err)
        throw err;
    }
}


export const GetAllTechnologies = async()=>{
    try{
        const response = await axios.get<Technology[]>("http://localhost:5116/api/jobOffer/technologies")
        return response.data
        
    }catch(err){
        console.error("GetAllTechnologiesError: ",err)
    }
}

export const AddTechnologyToJobOffer = async(offerId:number,technology:string,type:string)=>{
    try{
        const response = await axios.post("http://localhost:5116/api/jobOffer/AddTechnologyToOffer",{
            jobOfferId:offerId,
            technologyName:technology,
            type:type
        })
    }catch(err){
        console.error("AddTechnologyToJobOfferError: ",err)
        throw err
    }
}