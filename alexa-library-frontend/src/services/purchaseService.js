import { api } from "./http";

export async function createPurchase(clientId, bookId, quantity) {
  const { data } = await api.post(`/purchases`, { clientId, bookId, quantity });
  return data;
}
