import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search Class, Documents, Activities..." />
      </div>
      <div className="user-info">
       <h1>header</h1>
      </div>
    </header>
  );
}

export default Header;