import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchUsersAPI = async (limit: number, skip: number) => {
  const response = await apiClient.get(`/users?limit=${limit}&skip=${skip}`);
  return response.data.users;
};

export const fetchUserByIdAPI = async (id: number) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const searchUsersAPI = async (query: string) => {
  const response = await apiClient.get(`/users/search?q=${query}`);
  return response.data.users;
};
