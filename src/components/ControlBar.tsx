import { AppBar, Toolbar, Box, Button, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../store/slices/userSlice";

const ControlBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, username } = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ minHeight: 48 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ fontWeight: 600 }}
          >
            HOME
          </Button>

          <Button
            component={RouterLink}
            to="/newPost"
            color="inherit"
            sx={{ fontWeight: 600 }}
          >
            NEW POST
          </Button>

          <Button
            component={RouterLink}
            to="/home"
            color="inherit"
            sx={{ fontWeight: 600 }}
          >
            MY EXHIBITS
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          {isAuthenticated && username && (
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Welcome, {username}!
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {isAuthenticated ? (
            <Button onClick={handleLogout} color="inherit" sx={{ fontWeight: 600 }}>
              LOGOUT
            </Button>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit" sx={{ fontWeight: 600 }}>
                LOGIN
              </Button>
              <Button component={RouterLink} to="/register" color="inherit" sx={{ fontWeight: 600 }}>
                REGISTER
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ControlBar;
