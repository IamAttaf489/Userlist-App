import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsersAPI,
  fetchUserByIdAPI,
  searchUsersAPI,
} from "../services/api";
import { store } from "../store";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: {
    name: string;
    address: {
      address:string;
    };
    department: string;
    title: string;
  };
}

interface UserState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

// Fetch users (with pagination)
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ limit, skip }: { limit: number; skip: number }) => {
    const data = await fetchUsersAPI(limit, skip);
    return data;
  }
);

// Fetch single user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (id: number) => {
    const data = await fetchUserByIdAPI(id);
    return data;
  }
);

// Search users by name
export const searchUsers = createAsyncThunk(
  "users/searchUsers",
  async (query: string) => {
    const data = await searchUsersAPI(query);
    return data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search users";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user details";
      })      
  },
});

export default userSlice.reducer;
export type AppDispatch = typeof store.dispatch;