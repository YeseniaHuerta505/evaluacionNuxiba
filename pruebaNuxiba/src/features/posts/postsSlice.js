import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (userId) => {
    // Obtener los posts del usuario
    const postsResponse = await fetch(`${API_URL}/posts?userId=${userId}`);

    if (!postsResponse.ok) {
      throw new Error("Error al obtener los posts");
    }

    const posts = await postsResponse.json();

    // Obtener los comentarios de cada post
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const commentsResponse = await fetch(
          `${API_URL}/comments?postId=${post.id}`,
        );

        if (!commentsResponse.ok) {
          throw new Error("Error al obtener los comentarios");
        }

        const comments = await commentsResponse.json();
        return {
          ...post,
          comments,
        };
      }),
    );

    return postsWithComments;
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.error = "No se pudieron obtener los posts";
      });
  },
});
export const { clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
