import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;