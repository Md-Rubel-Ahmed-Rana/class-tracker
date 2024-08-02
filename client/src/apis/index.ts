import axios from "axios";

export const baseApi = "https://class-tracker.up.railway.app/api/v1";

export const getApi = async (apiEndpoint: string) => {
  try {
    const data = await axios.get(`${baseApi}/${apiEndpoint}`, {
      withCredentials: true,
    });
    return data?.data;
  } catch (error) {
    return error;
  }
};

export const postApi = async (apiEndpoint: string, payload: any) => {
  try {
    const data = await axios.post(`${baseApi}/${apiEndpoint}`, payload, {
      withCredentials: true,
    });
    return data?.data;
  } catch (error) {
    return error;
  }
};

export const patchApi = async (apiEndpoint: string, payload: any) => {
  try {
    const data = await axios.patch(`${baseApi}/${apiEndpoint}`, payload, {
      withCredentials: true,
    });
    return data?.data;
  } catch (error) {
    return error;
  }
};

export const deleteApi = async (apiEndpoint: string) => {
  try {
    const data = await axios.delete(`${baseApi}/${apiEndpoint}`, {
      withCredentials: true,
    });
    return data?.data;
  } catch (error) {
    return error;
  }
};
