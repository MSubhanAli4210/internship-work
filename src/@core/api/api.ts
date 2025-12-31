import {
  axiosInstance,
  axiosInstanceOfAdmin,
  axiosInstanceOfServer,
  axiosInstanceOfUser,
} from "../@axios/instances";
import { userAuthStore } from "../../store/userAuthStore";

export const getData = async () => {
  return (await axiosInstance.get("")).data;
};

export const signUpApi = async (data: any) => {
  return await axiosInstanceOfServer.post("auth/signup", data);
};

export const lookUpApi = async (data: any) => {
  return await axiosInstanceOfServer.post("auth/lookup", data);
};

export const otpVerifyApi = async (data: any) => {
  return await axiosInstanceOfServer.post("auth/verify-otp", data);
};

export const getDepositApi = async () => {
  const { token, user } = userAuthStore.getState();
  if (!token || !user?.userId) {
    throw new Error("User not authenticated");
  }
  if (user.role === "admin") {
    const res = await axiosInstanceOfAdmin.get(`allDeposits/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
  const res = await axiosInstanceOfUser.get(`myDeposits/${user.userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const approveDepositApi = async (depositId: string, token: string) => {
  return await axiosInstanceOfAdmin.get(`approveDeposit/${depositId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const rejectDepositApi = async (depositId: string, token: string) => {
  return await axiosInstanceOfAdmin.get(`rejectDeposit/${depositId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addDepositApi = async (data: any) => {
  const token = userAuthStore.getState().token;
  return await axiosInstanceOfUser.post("createDeposit", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteDepositApi = async (depositId: string, token: string) => {
  console.log("Deleting deposit with ID:", depositId);
  return await axiosInstanceOfUser.get(`deleteDeposit/${depositId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getWithdrawApi = async () => {
  const { token, user } = userAuthStore.getState();
  if (!token || !user?.userId) {
    throw new Error("User not authenticated");
  }
  if (user.role === "admin") {
    const res = await axiosInstanceOfAdmin.get(`allWithdraws/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
  const res = await axiosInstanceOfUser.get(`myWithdraws/${user.userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const addWithdrawApi = async (data: any) => {
  const token = userAuthStore.getState().token;
  return await axiosInstanceOfUser.post("createWithdraw", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteWithdrawApi = async (withdrawId: string, token: string) => {
  console.log("Deleting deposit with ID:", withdrawId);
  return await axiosInstanceOfUser.get(`deleteWithdraw/${withdrawId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBalanceApi = async () => {
  const { token } = userAuthStore.getState();
  const res = await axiosInstanceOfAdmin.get("myBalance", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}


export const approveWithdrawApi = async (withdrawId: string, token: string) => {
  return await axiosInstanceOfAdmin.get(`approveWithdraw/${withdrawId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const rejectWithdrawApi = async (withdrawId: string, token: string) => {
  return await axiosInstanceOfAdmin.get(`rejectWithdraw/${withdrawId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};