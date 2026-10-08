import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/usersSlice'
import postsReducer from '../features/posts/postsSlice'
import todosReducer from '../features/todos/todosSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    todos: todosReducer,
  },
})