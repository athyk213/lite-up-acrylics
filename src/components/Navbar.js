import "./Navbar.css";
import { FaCartArrowDown } from "react-icons/fa";
import logo from "../logo_transparent.png";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount, setSearchInput, setAlbums }) {
  const handleNavClick = () => {
    setSearchInput("");
    setAlbums([]);
  };
  return (
    <header className="navbar">
      <div className="navbar__logo-container">
        <Link to="/" onClick={handleNavClick}>
          <img src={logo} alt="Logo" className="navbar__logo" />
        </Link>
        <Link to="/" onClick={handleNavClick}>
          <h4 className="navbar__logo-text">
            Bringing your favorite albums to life.
          </h4>
        </Link>
      </div>
      <nav className="navbar__nav">
        <ul className="navbar__menu">
          <Link to="/community" onClick={handleNavClick}>
            <li className="navbar__menu-item">Community</li>
          </Link>
          <p>|</p>
          <Link to="/info" onClick={handleNavClick}>
            <li className="navbar__menu-item">Info</li>
          </Link>
          <p>|</p>
          <li className="navbar__menu-item">
            <Link to="/cart" onClick={handleNavClick}>
              <FaCartArrowDown className="navbar__cart-icon" />
              <span className="navbar__cart-count">{cartCount}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
