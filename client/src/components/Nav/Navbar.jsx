import React from 'react';
import { Navbar, NavItem, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <Navbar>
      <NavItem>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </NavItem>
      {localStorage.getItem('react_sub_token') && (
        <NavItem>
          <Link to="/" className="nav-link">
            Logout
          </Link>
        </NavItem>
      )}
    </Navbar>
  );
};
