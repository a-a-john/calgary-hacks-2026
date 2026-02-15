import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from '../assets/logo.png';


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
    <div className="nav-logo">
        <img src={logo} alt="Company Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="../pages/Home">Home</Link></li>
        <li><Link to="../pages/Memory">Memory</Link></li>
        <li><Link to="../pages/Mosaic">Mosaic</Link></li>
        <li><Link to="../pages/Login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
