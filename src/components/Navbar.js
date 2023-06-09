import "./Navbar.css";
import { FaCartArrowDown } from "react-icons/fa";
import logo from "../logo_transparent.png";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

export default function Navbar({
  cartCount,
  setSearchInput,
  setAlbums,
  signedIn,
  updateAuthStatus,
  setAlbumsInCart,
  setCartCount,
  setQuantities,
  username,
  setUsername,
}) {
  const navigate = useNavigate();
  const handleNavClick = () => {
    setSearchInput("");
    setAlbums([]);
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      updateAuthStatus(false);
      setAlbumsInCart([]);
      setCartCount(0);
      setQuantities([]);
      setUsername("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
          {!signedIn ? (
            <Link to="/signin" onClick={handleNavClick}>
              <li className="navbar__menu-item">Sign In</li>
            </Link>
          ) : (
            <>
              <li className="navbar__menu-item">{username}</li>
              <p>|</p>
              <Link to="/" onClick={handleSignOut}>
                <li className="navbar__menu-item">Sign Out</li>
              </Link>
            </>
          )}
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
