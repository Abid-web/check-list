function Navbar({ activeTab, onSelectTab, username = "Haithem" }) {
  const navItems = [
    { id: 'Home', label: 'Home' },
    { id: 'Tasks', label: 'Tasks' },
    { id: 'Notes', label: 'Notes' },
    { id: 'Settings', label: 'Settings' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>Productivity Suite</h2>
        <span className="user-badge">{username}</span>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li 
            key={item.id} 
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onSelectTab(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;