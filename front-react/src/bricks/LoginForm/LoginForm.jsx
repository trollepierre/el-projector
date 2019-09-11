import React from 'react';
import { Button, Input } from '../../components';
import { useAppContext } from '../../app/AppContext';

const LoginForm = () => {
  const { authenticate } = useAppContext()
  const input = React.createRef();

  const handleSubmit = event => {
    event.preventDefault()
    authenticate(input.current.value)
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Input type='text' name={'mot de passe'} ref={input}/>
      <Button type='submit' onClick={handleSubmit} height={100} text='Se Connect'>Se connecter</Button>
    </form>
  );
};

export default LoginForm;
