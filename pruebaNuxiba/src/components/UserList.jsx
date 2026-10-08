import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/users/usersSlice";

function UserList() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.users);
  const selectedUser = useSelector((state) => state.users.selectedUser);

  const handleSelectUser = (user) => {
    dispatch(selectUser(user));
  };

  return (
    <div>
      {users.map((user) => {
        const isSelected = selectedUser?.id === user.id;

        return (
          <button
            key={user.id}
            onClick={() => handleSelectUser(user)}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginBottom: "8px",
              cursor: "pointer",
              textAlign: "left",
              borderRadius: "8px",
              border: isSelected ? "1px solid #1976d2" : "1px solid #444",
              backgroundColor: isSelected ? "#1976d2" : "#2a2d3a",
              color: "#ffffff",
            }}
          >
            <strong>{user.name}</strong>

            <br />

            <small style={{ color: isSelected ? "#e3f2fd" : "#b0b3c0" }}>
              @{user.username}
            </small>
          </button>
        );
      })}
    </div>
  );
}

export default UserList;
