import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes
import LandingPage from './components/landingPage/LandingPage';
import Navbar from './components/navigation/navbar/Navbar';
import UserProfile from './pages/userProfile/UserProfile';
import Dashboard from './components/dashbord/Dashboardgit';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes> {/* Wrap your Routes */}
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path='/user-dashboard' element={<Dashboard/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
