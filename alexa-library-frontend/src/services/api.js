import { api } from "./http";

export const fetchClientRentals = async (clientId) => {
  const { data } = await api.get(`/rentals/active/${clientId}`);
  return data;
};

export const fetchClientPurchases = async (clientId) => {
  const { data } = await api.get(`/purchases/client/${clientId}`);
  return data;
};

export const returnBook = async (rentalId) => {
  const { data } = await api.post(`/rentals/return/${rentalId}`);
  return data;
};

export const extendRental = async (rentalId) => {
  const { data } = await api.post(`/rentals/extend/${rentalId}`);
  return data;
};
