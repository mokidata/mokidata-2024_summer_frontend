import axios from 'axios'
import { BASE_URL } from '../component/Url';



export const mokiApi = axios.create(
    {
        baseURL : `${BASE_URL}`,
        withCredentials: true
    });

export async function postData(endpoint, datatosend){
    try{
        const response = await mokiApi.post(endpoint,datatosend)
        return response.data;
    }
    catch(error){
        console.error("something wrong",error);
        throw error;
    }
};

export async function getData(endpoint, datatosend){
    try{
        const response = await mokiApi.get(endpoint, {params: datatosend});
        return response.data
    }
    catch(error) {
        console.error('Error fetching data', error);
    }
}
