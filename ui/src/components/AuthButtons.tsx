import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-8">
      <Link
        to="/login"
        className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-extrabold text-lg px-8 py-4 rounded-full shadow-lg flex items-center gap-2 transition-all border-4 border-yellow-200 hover:scale-105"
      >
        <span role="img" aria-label="paw" className="text-2xl">🐾</span>
        Sniff In (Dog Owner Login)
      </Link>
      <Link
        to="/register"
        className="bg-gradient-to-r from-pink-400 to-yellow-400 hover:from-pink-500 hover:to-yellow-500 text-white font-extrabold text-lg px-8 py-4 rounded-full shadow-lg flex items-center gap-2 transition-all border-4 border-pink-200 hover:scale-105"
      >
        <span role="img" aria-label="dog" className="text-2xl">🐶</span>
        Wag & Register (New Dog Profile)
      </Link>
    </div>
  );
};

export default AuthButtons;
