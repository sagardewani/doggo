import doggoLogo from '../assets/doggo-logo.svg'
// import { Link } from 'react-router-dom'

const Header = () => (
  <header className="w-full bg-gradient-to-r from-gray-900 to-gray-700 shadow-lg py-4 px-6 flex items-center justify-between z-50">
    <div className="flex items-center gap-4">
      <img src={doggoLogo} alt="Doggo Logo" className="h-10 w-10" />
      <h1 className="text-2xl font-extrabold text-white tracking-tight">DOGGO – Citywide Pet Service Finder</h1>
    </div>
    {/* <div className="flex-shrink-0 flex items-center">
      <Link to="/vendor-panel" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-4 py-2 rounded-xl shadow transition whitespace-nowrap h-auto">
        For Vendors
      </Link>
    </div> */}
  </header>
)

export default Header
