import { axiosInstance, axiosInstance2 } from "../@axios/instances";
export const getData = async () => {
  return (await axiosInstance.get("")).data;
};

export const getEmail= async ()=>{
  return (await axiosInstance2.get("")).data;
}
