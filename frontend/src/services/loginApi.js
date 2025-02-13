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

mokiApi.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log(originalRequest)
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await mokiApi.post("/api/auth/refresh");
                  if (refreshResponse.status === 200) {
                    const refreshData = refreshResponse.data;
                    sessionStorage.setItem("accessToken", refreshData.token);
                    sessionStorage.setItem("name", refreshData.name);
                    mokiApi.defaults.headers.common[
                      "Authorization"
                    ] = `Bearer ${refreshData.token}`;
                    originalRequest.headers["Authorization"] = `Bearer ${refreshData.token}`;
                }
          
          return mokiApi(originalRequest);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );