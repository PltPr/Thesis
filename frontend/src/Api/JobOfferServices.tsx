import axios from "axios";
import { JobOfferGet } from "../Models/JobOffers";

const api ="http://localhost:5116/api/jobOffer"

export const getJobOffersApi = async () => {
    try {
        const response = await axios.get<JobOfferGet[]>(api);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.error("Error fetching job offers:", error);
        return null;
    }
};