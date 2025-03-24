import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Propertylisting from './pages/Propertylisting.tsx';
import Landlordlisting from './pages/Landlords.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Renders the Home component at the root path "/" */}
        <Route path="/" element={<Home />} />

        {/* Renders the Propertylisting component at "/listings" */}
        <Route path="/properties" element={<Propertylisting />} />
        <Route path="/landlords" element={<Landlordlisting />} />
        <Route path="/login" element={<Landlordlisting />} />

      </Routes>
    </Router>
  );
}

export default App;
