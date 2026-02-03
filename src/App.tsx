import { Navigate } from "react-router-dom";
import HomePage from "./layouts/HomePage";
import NewPost from "./layouts/NewPost";
import Login from "./layouts/LoginPage";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import ControlBar from "./components/ControlBar";
import RegisterPage from "./layouts/RegisterPage";
import StripePage from "./layouts/StripePage";
import { SnackbarProvider } from "./contexts/SnackbarContext";

function ProtectedRoute({ children, isAllowed }: { children: any, isAllowed: boolean }) {
  if (!isAllowed) {
    return <Navigate to="/login" state={{ from: 'protected' }} replace />;
  }

  return children;
}

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <SnackbarProvider>
      <ControlBar />
      <Routes>
        <Route path="/" element={<StripePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newPost"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <NewPost />
            </ProtectedRoute>
          }
        />
      </Routes>
    </SnackbarProvider>
  );
}

export default App;
