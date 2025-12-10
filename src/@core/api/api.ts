import { axiosInstance, axiosInstanceOfServer } from "../@axios/instances";
export const getData = async () => {
  return (await axiosInstance.get("")).data;
};

export const signUpApi = async (data: any) => {
  return await axiosInstanceOfServer.post("/signup", data);
};

export const logInApi = async (data: any) => {
  return await axiosInstanceOfServer.post("/lookup", data);
};

export const otpVerifyApi = async (data: any) => {
  return await axiosInstanceOfServer.post("/verify-otp", data);
};
