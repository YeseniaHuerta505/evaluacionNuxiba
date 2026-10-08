import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  createTheme,
  FormControlLabel,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { addTodo } from "../features/todos/todosSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#1976d2" },
    text: { primary: "#ffffff", secondary: "#b0b3c0" },
  },
});

function TodoForm({ userId }) {
  const dispatch = useDispatch();
  const { saving, saveError } = useSelector((state) => state.todos);

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await dispatch(
        addTodo({ userId, title: title.trim(), completed }),
      ).unwrap();

      // Limpiar el formulario solo si se guardó correctamente
      setTitle("");
      setCompleted(false);
    } catch {
      // El error ya se guarda en el store (saveError)
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          my: 2,
          backgroundColor: "#2a2d3a",
          borderColor: "#444",
          borderRadius: "8px",
          textAlign: "left",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Nueva tarea
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <TextField
            label="Título"
            size="small"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#1f212b",
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={completed}
                onChange={(e) => setCompleted(e.target.checked)}
                sx={{ color: "#b0b3c0" }}
              />
            }
            label="Completado"
          />

          {saveError && <Alert severity="error">{saveError}</Alert>}

          <Box>
            <Button
              type="submit"
              variant="contained"
              disabled={saving || !title.trim()}
              sx={{
                "&.Mui-disabled": {
                  backgroundColor: "#3a3d4d",
                  color: "#80838f",
                },
              }}
            >
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default TodoForm;
