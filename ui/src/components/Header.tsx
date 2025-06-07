import doggoLogo from '../assets/doggo-logo.svg'
// import { Link } from 'react-router-dom'

const Header = () => (
  <header className="py-4 px-6 flex items-center z-50 rounded-md mb-4">
    <div className="flex items-center gap-4">
      <img src={doggoLogo} alt="Doggo Logo" className="h-10 w-10" />
      <h1 className="text-2xl font-extrabold text-text-dark tracking-tight">DOGGO – Thriving Dog Community!</h1>
    </div>
  </header>
)

export default Header
