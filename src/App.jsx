import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";
import EditTransaction from "./components/EditTransaction";
import NotFound from "./components/NotFound";
import Users from "./components/Users";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <Transactions />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/add"
          element={
            <PrivateRoute>
              <AddTransaction />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/edit/:id"
          element={
            <PrivateRoute>
              <EditTransaction />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
