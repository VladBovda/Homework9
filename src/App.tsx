import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAllowed }: { children: any, isAllowed: boolean }) {
  if (!isAllowed) {

    return <Navigate to="/login" replace />;
  }

  return children;
}

import { Routes, Route } from "react-router-dom";

function App({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/protected"
        element={
          <ProtectedRoute isAllowed={isAuthenticated}>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
