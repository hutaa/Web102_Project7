import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <h2>PokéFusion</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create">Create Pokemon</Link></li>
        <li><Link to="/read">PokéFusion Inventory!</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
