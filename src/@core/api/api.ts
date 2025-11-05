import { axiosInstance } from "../@axios/instances";

export const getData = async () => {
  return (await axiosInstance.get("")).data;
};