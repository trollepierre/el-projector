import React from 'react';
import { Button } from '../../components';
import { tokenService } from '../../services';
import { useAppContext } from '../../app/AppContext';

const Header = () => {
  const { setIsAuthenticated } = useAppContext()

  const logout = () => {
    setIsAuthenticated(false)
    return tokenService.removeTokens();
  }

  return (
    <nav className="header">
      <Button onClick={logout} text='Logout'/>
    </nav>
  );
};

export default Header;
