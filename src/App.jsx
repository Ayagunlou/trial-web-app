import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Router>
  );
}

export default App;
