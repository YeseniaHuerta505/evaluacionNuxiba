import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Stack } from "@mui/material";
import { fetchPosts, clearPosts } from "../features/posts/postsSlice";
import { fetchTodos, clearTodos } from "../features/todos/todosSlice";
import TodoForm from "./TodoForm";

function UserDetail() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.selectedUser);

  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.posts);

  const {
    todos,
    loading: todosLoading,
    error: todosError,
  } = useSelector((state) => state.todos);

  // Limpiar posts y todos al cambiar de usuario
  useEffect(() => {
    dispatch(clearPosts());
    dispatch(clearTodos());
  }, [user?.id, dispatch]);

  if (!user) {
    return (
      <div>
        <h2>Selecciona un usuario</h2>
        <p>Selecciona un usuario de la lista para consultar su información.</p>
      </div>
    );
  }

  const handlePosts = () => {
    dispatch(clearTodos());
    dispatch(fetchPosts(user.id));
  };

  const handleTodos = () => {
    dispatch(clearPosts());
    dispatch(fetchTodos(user.id));
  };

  return (
    <div>
      <h2>{user.name}</h2>

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {user.phone}
      </p>

      <p>
        <strong>Website:</strong> {user.website}
      </p>

      <p>
        <strong>Ciudad:</strong> {user.address.city}
      </p>

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 2 }}>
        <Button variant="contained" color="primary" onClick={handlePosts}>
          Posts
        </Button>

        <Button variant="contained" color="secondary" onClick={handleTodos}>
          Todos
        </Button>
      </Stack>

      {/* POSTS */}
      {(postsLoading || postsError || posts.length > 0) && (
        <div>
          <h3>Posts</h3>

          {postsLoading && <p>Cargando posts...</p>}

          {postsError && <p>{postsError}</p>}

          {posts.map((post) => (
            <div key={post.id}>
              <h4>{post.title}</h4>

              <p>{post.body}</p>

              <strong>Comentarios:</strong>

              {post.comments.map((comment) => (
                <div key={comment.id}>
                  <p>
                    <strong>{comment.name}</strong>
                  </p>

                  <p>{comment.body}</p>

                  <hr />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* TODOS */}
      {(todosLoading || todosError || todos.length > 0) && (
        <div>
          <h3>Todos</h3>

          <TodoForm userId={user.id} />

          {todosLoading && <p>Cargando tareas...</p>}

          {todosError && <p>{todosError}</p>}

          <ul>
            {todos.map((todo, index) => (
              <li key={`${todo.id}-${index}`}>
                <strong>#{todo.id}</strong> {todo.title}{" "}
                {todo.completed ? "✅" : "❌"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
