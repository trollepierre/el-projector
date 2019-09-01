import React from 'react';
import { Button, Input } from '../../components';
import { auth, api } from '../../services'
import { useAppContext } from '../../app/AppContext';

const LoginForm = () => {
  const { setIsAuthenticated } = useAppContext()
  const input = React.createRef();

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('before await');

    let data = {
      secret: input.current.value,
      email: 'pierre@recontact.me',
      name: input.current.value
    };
    let tokens = await api.post('login', data);
    console.log('after await');
    console.log(tokens);
    console.log({auth});

    await auth.authenticate(tokens, data)
    setIsAuthenticated(true)
    return tokens;
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <Input type='text' name={'mot de passe'} ref={input}/>
      <Button type='submit' onClick={handleSubmit} height={100} text='Se Connect'>Se connecter</Button>
    </form>
  );
};

export default LoginForm;
