import { api } from "./http";

export const getAvailableBooks = async () => {
  const { data } = await api.get(`/books/available`);
  return data;
};
