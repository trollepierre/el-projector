import React, { useEffect } from 'react';
import LoginForm from '../../bricks/LoginForm'
import { tokenService } from '../../services';
import { useAppContext } from '../../app/AppContext';

const LoginPage = () => {
  const { setIsAuthenticated } = useAppContext();

  useEffect( () => {
    const isAuth = tokenService.isAuthenticated()
    if(isAuth) return setIsAuthenticated(isAuth);
  }, [setIsAuthenticated]);

  return (
    <div className="login-page">
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
