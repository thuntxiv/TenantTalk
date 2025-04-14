import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Propertylisting from './pages/Propertylisting.tsx';
import Profile from './pages/Profile.jsx';
import LandlordListPage from './pages/Landlords.tsx';
import ListingDetails from './components/ListingDetails.tsx';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './components/AuthContext.tsx';
import LandlordProfilePage from './pages/LandlordProfile.tsx';
import ForumPage from './pages/Forum.tsx';
import DMPage from './pages/DMPage.tsx';
import Conversations from './pages/Conversations.tsx';
import ConversationDetail from './pages/ConversationDetail.tsx';
import About from './pages/About.tsx'


const clientId = '933058198355-7hlkolpvuoogsvke3ngsrvr5d2ldpdev.apps.googleusercontent.com';


function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Propertylisting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/landlords" element={<LandlordListPage />} />
        <Route path="/landlords/:id" element={<LandlordProfilePage />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/dm" element={<DMPage />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/conversations/:id" element={<ConversationDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </AuthProvider>
      </GoogleOAuthProvider>
    </Router>
  );
}

export default App;
