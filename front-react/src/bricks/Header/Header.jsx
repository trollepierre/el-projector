import React from 'react';
import { Button } from '../../components';
import authentication from '../../services/auth/auth-service';
import { useAppContext } from '../../app/AppContext';

const Header = () => {
  const { setIsAuthenticated } = useAppContext()

  const logout = () => {
    setIsAuthenticated(false)
    return authentication.disconnect();
  }

  return (
    <nav className="header">
      <Button onClick={logout} text='Logout'/>
    </nav>
  );
};

export default Header;
