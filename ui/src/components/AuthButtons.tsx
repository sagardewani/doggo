import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-8">
      <Link
        to="/login"
        className="bg-primary text-white font-extrabold text-lg px-8 py-4 rounded-full shadow-lg flex items-center gap-2 transition-all border-4 border-primary-light hover:scale-105"
      >
        <span role="img" aria-label="paw" className="text-2xl">🐾</span>
        Sniff In (Dog Owner Login)
      </Link>
      <Link
        to="/register"
        className="bg-secondary text-white font-extrabold text-lg px-8 py-4 rounded-full shadow-lg flex items-center gap-2 transition-all border-4 border-secondary-light hover:scale-105"
      >
        <span role="img" aria-label="dog" className="text-2xl">🐶</span>
        Wag & Register (New Dog Profile)
      </Link>
    </div>
  );
};

export default AuthButtons;
