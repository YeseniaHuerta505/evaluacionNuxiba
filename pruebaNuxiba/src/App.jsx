import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "./features/users/usersSlice";

import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

function App() {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1>Prueba React + Redux</h1>

      {loading && <p>Cargando usuarios...</p>}

      {error && <p>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "30px",
        }}
      >
        <section>
          <h2>Usuarios</h2>

          <UserList />
        </section>

        <section>
          <UserDetail />
        </section>
      </div>
    </div>
  );
}

export default App;
