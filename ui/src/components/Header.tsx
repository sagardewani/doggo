import doggoLogo from '../assets/doggo-logo.svg'
// import { Link } from 'react-router-dom'

const Header = () => (
  <header className="flex flex-col sm:flex-row items-center gap-4 py-6 bg-yellow-50 sticky top-0 z-10 border-b border-yellow-200 justify-center">
    <img src={doggoLogo} alt="Doggo Logo" className="w-14 h-14" />
    <h1 className="text-2xl font-bold text-yellow-700 m-0 tracking-wide text-center flex-1">DOGGO – Citywide Pet Service Finder</h1>
    {/* <div className="flex-shrink-0 flex items-center">
      <Link to="/vendor-panel" className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold px-4 py-2 rounded-xl shadow transition whitespace-nowrap h-auto">
        For Vendors
      </Link>
    </div> */}
  </header>
)

export default Header
