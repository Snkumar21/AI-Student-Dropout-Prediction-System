import { AuthProvider, useAuth } from "./utils/AuthContext";
import LoginPage from "./assets/LoginPage";
import Dashboard from "./Dashboard";

// Router Component
function AppRouter() {
  const { user } = useAuth();

  return user ? <Dashboard /> : <LoginPage />;
}

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;