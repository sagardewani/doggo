import dogIllustration from '../assets/doggo_community.svg'; // Use a new illustration
import doggoLogo from '../assets/doggo-logo.svg'; // Corrected logo import path
import React from 'react';

interface IFormPage {
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
}

const FormPage: React.FC<IFormPage> = ({
  // No props needed for this component
  title = "Welcome back",
  subTitle = "Sign in to your account to join the fun.",
  children
}) => {
  
  return (
    <div className='grid place-items-center flex-1'>
      <div className="grid grid-flow-col place-items-center gap-8">
        <div className="hidden md:flex flex-col items-center justify-center w-full" id="left-section">
          <h2 className="text-4xl font-extrabold text-text mb-2 text-center tracking-tight">Let's explore the Doggo community!</h2>
          <p className="text-text-light text-lg text-center max-w-xs">Sign in to connect, share, and discover the best moments with your furry friends.</p>
          <div className="mb-4">
            <img src={dogIllustration} alt="Doggo Community" className="object-contain drop-shadow-xl animate-float max-h-[400px]" />
          </div>
        </div>
        <div className="flex-col w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-gray-200 mx-auto" id="right-section">
          <div className="flex items-center gap-2 mb-6">
            <img src={doggoLogo} alt="Doggo Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-text tracking-tight">Doggo</span>
          </div>
          <h1 className="text-2xl font-bold text-text mb-2">{title}</h1>
          <p className="text-gray-600 mb-6">{subTitle}</p>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormPage;