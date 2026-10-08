import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error("Error al obtener los usuarios");
  }

  return await response.json();
});

const usersSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
  },

  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },

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

      .addCase(fetchUsers.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudieron obtener los usuarios";
      });
  },
});

export const { selectUser } = usersSlice.actions;

export default usersSlice.reducer;
