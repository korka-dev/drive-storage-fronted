import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FileView from './components/FileView';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/files"
          element={
            <ErrorBoundary errorMessage="Error in the Home component">
              {/* Wrap the Home component with ErrorBoundary and pass a custom error message */}
              <Home />
            </ErrorBoundary>
          }
        />
        <Route
          path="/files/:dir_path"
          element={
            <ErrorBoundary errorMessage="Error in the FileView component">
              {/* Wrap the FileView component with ErrorBoundary and pass a custom error message */}
              <FileView />
            </ErrorBoundary>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
