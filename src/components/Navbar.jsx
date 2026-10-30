// src/components/Navbar.jsx
import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  PackageSearch, 
  PlusCircle, 
  ClipboardList, 
  LogIn, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Simple token check (replace with your auth context when ready)
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setIsOpen(false);
  };

  // Helper function to dynamically style active vs inactive navigation links
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-700 font-semibold'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
    }`;

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo / Home link */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
              <PackageSearch size={22} />
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900 leading-tight block">
                CampusFind
              </span>
              <span className="text-xs text-gray-500 font-normal">
                Lost & Found Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/" className={getNavLinkClass}>
              <PackageSearch size={18} />
              Browse Items
            </NavLink>

            {token && (
              <NavLink to="/my-claims" className={getNavLinkClass}>
                <ClipboardList size={18} />
                My Claims
              </NavLink>
            )}

            {/* Primary Action Button */}
            <Link
              to="/report"
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm ml-2"
            >
              <PlusCircle size={17} />
              Report Item
            </Link>

            {/* Auth Buttons */}
            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 ml-4 text-gray-500 hover:text-red-600 px-3 py-2 text-sm font-medium transition"
                title="Log out"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 ml-3 border border-gray-300 hover:border-gray-400 text-gray-700 px-3.5 py-2 rounded-lg text-sm font-medium transition"
              >
                <LogIn size={17} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <NavLink to="/" className={getNavLinkClass} onClick={closeMenu}>
            <PackageSearch size={18} />
            Browse Items
          </NavLink>

          {token && (
            <NavLink to="/my-claims" className={getNavLinkClass} onClick={closeMenu}>
              <ClipboardList size={18} />
              My Claims
            </NavLink>
          )}

          <Link
            to="/report"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium w-full mt-2 shadow-sm"
          >
            <PlusCircle size={18} />
            Report Item
          </Link>

          <div className="pt-2 border-t border-gray-100">
            {token ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full text-red-600 hover:bg-red-50 py-2.5 rounded-lg text-sm font-medium"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium"
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}