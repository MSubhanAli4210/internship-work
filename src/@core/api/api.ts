import { axiosInstance } from "../@axios/instances";

export const getData = async () => {
  throw new Error("Test: this error is just to test my app")
  return (await axiosInstance.get("")).data;
};