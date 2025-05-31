import doggoLogo from '/public/doggo-logo.svg'
import './components/Header'
import './Header.css'

const Header = () => (
  <header className="doggo-header">
    <img src={doggoLogo} alt="Doggo Logo" className="doggo-logo" />
    <h1 className="doggo-title">DOGGO – Citywide Pet Service Finder</h1>
  </header>
)

export default Header
