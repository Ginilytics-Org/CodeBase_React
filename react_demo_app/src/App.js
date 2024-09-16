import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TodoList from './components/TodoList/TodoList';
import 'antd/dist/reset.css'; // Import Ant Design styles
import './App.css'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthWrapper component={<Login />} />} />
        <Route path="/register" element={<AuthWrapper component={<Register />} />} />
        <Route path="/todo" element={<ProtectedRoute component={<TodoList initialTodos={[]} />} />} />
      </Routes>
    </Router>
  );
};

// Wrapper component for authentication and redirection
const AuthWrapper = ({ component }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/todo');
  };

  const handleRegisterSuccess = () => {
    navigate('/');
  };

  // Ensure the component receives success callbacks as props
  return React.cloneElement(component, {
    onLoginSuccess: handleLoginSuccess,
    onRegisterSuccess: handleRegisterSuccess,
  });
};

// Component to protect routes that require authentication
const ProtectedRoute = ({ component }) => {
  const isAuthenticated = !!localStorage.getItem('loggedInUser'); // Check if user is authenticated

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => {}} />; // Ensure to handle success callback if needed
  }

  return (
    <>
      <Header />
      <main>{component}</main>
      <Footer />
    </>
  );
};

export default App;
