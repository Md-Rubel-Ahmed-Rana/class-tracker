import axios from "axios";

export const baseApi = "https://api-class-tracker.up.railway.app/api/v1";

export const getApi = async (apiEndpoint: string) => {
  try {
    const data = await axios.get(`${baseApi}/${apiEndpoint}`);
    return data?.data;
  } catch (error) {
    console.log("Error", error);
  }
};

export const postApi = async (apiEndpoint: string, payload: any) => {
  try {
    const data = await axios.post(`${baseApi}/${apiEndpoint}`, payload);
    return data?.data;
  } catch (error) {
    console.log("Error", error);
  }
};
