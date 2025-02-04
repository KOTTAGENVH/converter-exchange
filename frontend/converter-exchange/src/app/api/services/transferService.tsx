import { apiClient } from "../axios/api";

//Add transfer request
export const addTransferRequest = async (
  reciever: string,
  receiveremail: string,
  amount: number,
  amountfrom: number,
  currency: string,
  currencyfrom: string,
  note: string,
  userId: string,
  email: string,
  token: string,
  refreshToken: string
) => {
  try {
    const response = await apiClient.post(
      "/transfer/addtransfer",
      {
        receiver: reciever,
        receiveremail: receiveremail,
        amount: amount,
        amountfrom: amountfrom,
        currency: currency,
        currencyfrom: currencyfrom,
        note: note,
        userId: userId,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Refreshtoken: refreshToken,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

//Get Transfer History of user

export const getTransferHistory = async (
  userId: string,
  email: string,
  token: string,
  refreshToken: string
) => {
  try {
    const response = await apiClient.get(`/transfer/gettransfers/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Refreshtoken: refreshToken,
        email: email,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

//Delete Transfer
export const deleteTransfer = async (
  transferId: string,
  email: string,
  token: string,
  refreshToken: string
) => {
  try {
    const response = await apiClient.delete(
      `/transfer/deletetransfer/${transferId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Refreshtoken: refreshToken,
          email: email,
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};
