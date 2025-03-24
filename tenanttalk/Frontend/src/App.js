import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Propertylisting from './pages/Propertylisting.tsx';
import Profile from './pages/Profile.jsx';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './components/AuthContext.tsx';

const clientId = '933058198355-7hlkolpvuoogsvke3ngsrvr5d2ldpdev.apps.googleusercontent.com';


function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
      <Routes>
        {/* Renders the Home component at the root path "/" */}
        <Route path="/" element={<Home />} />

        {/* Renders the Propertylisting component at "/listings" */}
        <Route path="/properties" element={<Propertylisting />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
      </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
