import axios  from "axios";

const API_URL = 'http://localhost:3001/algorithms';

export const fetchAlgorithms = async () =>{
    try{
        const response = await axios.get(API_URL);
        return response.data;
    }catch(error){
        console.error('Error when fetch data from algorithms', error);
        return [];
    }
};

export const fetchAlgorithmBySlug = async (slug: string) => {
    try {
        const response = await axios.get(`${API_URL}/${slug}`);
        if (!response.data) {
            throw new Error("Cannot find algorithms data");
        }
        return response.data;
    } catch (error) {
        console.error(`Error when fetching detail for ${slug}:`, error);
        throw error; 
    }
};