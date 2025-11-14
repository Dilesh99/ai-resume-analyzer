import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { usePuterStore } from '../lib/puter';

const Navbar = () => {
  const { auth, init } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, [init]);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/auth?next=/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-xl md:text-2xl font-bold text-gradient">RESUME </p>
      </Link>
      <div className="flex items-center gap-2 md:gap-3">
        <Link
          to="/upload"
          className="primary-button w-fit text-sm md:text-base px-3 md:px-4 py-2"
        >
          <span className="hidden sm:inline">Upload Resume</span>
          <span className="sm:hidden">Upload</span>
        </Link>
        {auth.isAuthenticated && (
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
            title="Sign Out"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-600 md:w-4 md:h-4"
            >
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 17L21 12L16 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
