import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

import Dashboard from "./pages/dashboard/Dashboard";
import Setting from "./pages/setting/Setting";
import Profile from "./pages/profile/Profile";
import Home from "./pages/analytics-dashborad/Home";
import { useEffect } from "react";

// Create a Protected Route component
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user);

  // WIP - STEP-1: FOR SHARABLE LINK CREATING PROCESS
  useEffect(() => {
    // Parse the query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);

    // If there are query parameters, save them to localStorage
    if (queryParams.has("age") && queryParams.has("gender") && queryParams.has("from") && queryParams.has("to")) {
      const queryParamsObj = {
        age: queryParams.get("age"),
        gender: queryParams.get("gender"),
        from: queryParams.get("from"),
        to: queryParams.get("to"),
      };

      // Save to localStorage
      localStorage.setItem("savedQueryParams", JSON.stringify(queryParamsObj));
    }
  }, []);

  // Check if the user is authenticated
  if (!user.isAuthenticated) {
    // If not authenticated, redirect to the login page
    window.location.href = "/login";
    return null;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-right" reverseOrder={false} />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          

          {/* Protected Route - Dashboard and Nested Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes for Dashboard */}
            <Route path="/settings" element={<Setting />} />
            <Route path="/analytics" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
