import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FileView from './components/FileView';
import ErrorBoundary from './components/ErrorBoundary';
import { LoginForm } from './components/Login';
import { RegisterForm } from './components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary errorMessage="Error in the LoginForm component">
              <LoginForm />
            </ErrorBoundary>
          }
        />

        <Route
          path="/register"
          element={
            <ErrorBoundary errorMessage="Error in the RegisterForm component">
              <RegisterForm />
            </ErrorBoundary>
          }
        />
        <Route
          path="/files"
          element={
            <ErrorBoundary errorMessage="Error in the Home component">
              <Home />
            </ErrorBoundary>
          }
        />
        <Route
          path="/files/:dir_path"
          element={
            <ErrorBoundary errorMessage="Error in the FileView component">
              <FileView />
            </ErrorBoundary>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
