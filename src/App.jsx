// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppNavigator from './routes/AppNavigator';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans">
        
        {/* The Navbar stays at the top of every screen */}
        <Navbar />

        {/* The main container where our AppNavigator injects the current page */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <AppNavigator />
        </main>
        
      </div>
    </Router>
  );
}