import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Tasks } from "./pages/Tasks/Tasks";
import { Projects } from "./pages/Projects/Projects";
import { NewProject } from "./pages/Projects/NewProject";
import { Settings } from "./pages/Settings/Settings";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppShell />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
