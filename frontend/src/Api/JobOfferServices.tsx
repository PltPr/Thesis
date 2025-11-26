import axios from "axios";
import { JobOfferGet, JobOfferQuery } from "../Models/JobOffers";

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
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.error("Error fetching job offers:", error);
        return null;
    }
};