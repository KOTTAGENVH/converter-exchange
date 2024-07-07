//get exchange rates from api

export const getExchangeRates = async (currency: string) => {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/003f3f72de778a176381b3e9/latest/${currency}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};
