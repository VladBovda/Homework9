import { Navigate, Routes, Route } from "react-router-dom";
import MyExhibits from "./layouts/MyExhibits";
import NewPost from "./layouts/NewPost";
import Login from "./layouts/LoginPage";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import ControlBar from "./components/ControlBar";
import RegisterPage from "./layouts/RegisterPage";
import StripePage from "./layouts/StripePage";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import useSocket from "./hooks/useSocket";
 
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
      <SocketListener />
      <ControlBar />
      <Routes>
        <Route path="/" element={<StripePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute isAllowed={isAuthenticated}>
              <MyExhibits />
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

function SocketListener() {
  useSocket();
  return null;
}

export default App;
