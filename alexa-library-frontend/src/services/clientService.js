import { api } from "./http";

export const getClientById = async (clientId) => {
  const { data } = await api.get(`/clients/${clientId}`);
  return data;
};
