import React from 'react';

interface AuthSubmitButtonProps {
  loading?: boolean;
  isSubmitting?: boolean;
  text: string;
  loadingText?: string;
  className?: string;
}

const AuthSubmitButton: React.FC<AuthSubmitButtonProps> = ({
  loading = false,
  isSubmitting = false,
  text,
  loadingText,
  className = '',
}) => (
  <button
    className={`w-full bg-primary hover:bg-opacity-90 text-white font-bold py-3 rounded-lg shadow-lg text-lg transition disabled:opacity-60 ${className}`}
    type="submit"
    disabled={loading || isSubmitting}
  >
    {loading || isSubmitting ? loadingText || text : text}
  </button>
);

export default AuthSubmitButton;
