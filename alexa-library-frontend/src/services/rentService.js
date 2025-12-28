import { api } from "./http";

export async function rentBook(clientId, bookId) {
  const { data } = await api.post(`/rentals/rent`, { clientId, bookId });
  return data;
}
