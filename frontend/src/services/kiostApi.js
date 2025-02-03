import axios from 'axios'
import { BASE_URL_2 } from "../component/Url";


export const mokiKioskApi = axios.create(
    {
        baseURL : `${ BASE_URL_2 }`
    });

export async function getData(endpoint, datatosend){
    try{
        const response = await mokiKioskApi.get(endpoint,datatosend)
        return response.data;
    }
    catch(error){
        console.error("something wrong",error);
        throw error;
    }
};