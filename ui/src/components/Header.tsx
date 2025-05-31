import doggoLogo from '../assets/doggo-logo.svg'

const Header = () => (
  <header className="flex gap-4 py-6 bg-yellow-50 sticky top-0 z-10 border-b border-yellow-200 justify-center">
    <img src={doggoLogo} alt="Doggo Logo" className="w-14 h-14" />
    <h1 className="text-2xl font-bold text-yellow-700 m-0 tracking-wide text-center">DOGGO – Citywide Pet Service Finder</h1>
  </header>
)

export default Header
