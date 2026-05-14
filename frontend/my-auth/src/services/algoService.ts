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