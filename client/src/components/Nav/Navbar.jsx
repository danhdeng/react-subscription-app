import React, { useContext } from 'react';
import { Navbar, NavItem, NavLink, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../context';
import { initialFalseState } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

const LeftNavContainer = styled.div`
  margin-left: auto;
`;

export const Nav = () => {
  const [state, setState] = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('react_sub_token');
    setState(initialFalseState);
    navigate('/');
  };
  // console.log(state);
  if (state.loading) return <Loader />;
  return (
    <Navbar>
      <NavItem>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </NavItem>
      {state.data && (
        <LeftNavContainer>
          <NavItem>
            <NavLink onClick={logoutHandler} className="nav-link">
              Logout
            </NavLink>
          </NavItem>
        </LeftNavContainer>
      )}
    </Navbar>
  );
};
