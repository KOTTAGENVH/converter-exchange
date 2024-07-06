import { apiClient } from "../axios/api";

//Get transfer by user
export const getTransferByUser = async (userId: string, email: string) => {
  try {
    const response = await apiClient.get(`/transfer/gettransfers/${userId}`, {
      params: {
        email: email,
      },
      withCredentials: true, // Send cookies (including HTTP-only tokens)
    });

    return response.data; // Assuming you want to return the data from the response
  } catch (error) {
    console.error('Error fetching transfers:', error);
    throw error; // Rethrow the error or handle it appropriately
  }
};
