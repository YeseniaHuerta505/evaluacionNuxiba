import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (userId) => {
    const response = await fetch(`${API_URL}/todos?userId=${userId}`);

    if (!response.ok) {
      throw new Error("Error al obtener las tareas");
    }

    const todos = await response.json();

    // Ordenar por id de mayor a menor
    return [...todos].sort((a, b) => b.id - a.id);
  },
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async ({ userId, title, completed }) => {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ userId, title, completed }),
    });

    if (!response.ok) {
      throw new Error("Error al guardar la tarea");
    }

    return await response.json();
  },
);

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
    saving: false,
    saveError: null,
  },
  reducers: {
    clearTodos: (state) => {
      state.todos = [];
      state.error = null;
      state.saveError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Obtener tareas
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudieron obtener las tareas";
      })

      // Agregar tarea
      .addCase(addTodo.pending, (state) => {
        state.saving = true;
        state.saveError = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.saving = false;
        state.todos = [...state.todos, action.payload].sort(
          (a, b) => b.id - a.id,
        );
      })
      .addCase(addTodo.rejected, (state) => {
        state.saving = false;
        state.saveError = "No se pudo guardar la tarea";
      });
  },
});

export const { clearTodos } = todosSlice.actions;

export default todosSlice.reducer;
