import type React from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface HighlightButtonProps {  // Define any props if needed
  title?: string;
  popoverText?: string;
}

const HighlightButton: React.FC<HighlightButtonProps> = ({
  title = "Post a Dog Highlight",
  popoverText = "Add a new highlight for your dog!",
}) => {
  return (
    <Link
      to="/add-highlight"
      title="Post a Dog Highlight"
      className={`fixed bottom-8 right-8 z-50 
        w-16 h-16 group flex items-center justify-center
        bg-gradient-to-br from-highlight-light to-highlight
        hover:from-highlight hover:to-highlight-dark
        text-white font-bold
        rounded-full shadow-lg transition 
        duration-300 ease-in-out transform 
        hover:scale-105`}
    >
      <FaPlus className="text-3xl group-hover:rotate-90 transition-transform duration-300" />
      <span className="sr-only">{title}</span>
      <span className="absolute bottom-16 right-0 bg-black/80 text-white text-xs rounded-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{popoverText}</span>
    </Link>
  );
}

export default HighlightButton;