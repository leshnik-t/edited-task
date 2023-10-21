import './App.css';
import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthUserContext } from './context/AuthContext';
import LoginForm from './components/loginForm/LoginForm';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const username = useContext(AuthUserContext);

  const RequireAuth = ({ children }) => {
    return username ? children : <Navigate to="/login" />
  }

  const RedirectAuthUser = ({ children }) => {
    return username ? <Navigate to="/" /> : children
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={
            <RedirectAuthUser>
              <LoginForm />
            </RedirectAuthUser>
        }/>
        <Route path="/" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>  
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
