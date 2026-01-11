import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './routes/authRoute';
import { AuthProvider } from './utils/AuthContext';

function App() {
  return (
    <AuthProvider>
         <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
    </AuthProvider>
 
  );
}

export default App;
