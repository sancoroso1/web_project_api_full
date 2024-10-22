import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';

import * as auth from '../utils/auth';

function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleRegisterError = '';

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .authorize(email, password)
      .then((res) => {
        if (res === undefined) {
          handleRegisterError('fail');
        }
        handleLogin();
        history.push('/');
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          handleRegisterError('fail');
        } else {
          console.error(error);
        }
      });
  }

  return (
    <>
      <Header text={'Ingresar'}></Header>
      <form className='auth__container' onSubmit={handleSubmit}>
        <h3 className='auth__title'>Ingresar</h3>
        <label>
          <input
            type='email'
            name='email'
            id='email-input'
            className='auth__input'
            placeholder='E-Mail'
            minLength={2}
            maxLength={40}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type='password'
            name='password'
            id='password-input'
            className='auth__input'
            placeholder='Contraseña'
            minLength={2}
            maxLength={200}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit' className='auth__buttom'>
          Ingresar
        </button>
        <span className='auth__subtitle'>
          ¿Aún no eres miembro?{' '}
          <Link to='/register' className='auth__link'>
            Registrate aquí
          </Link>
        </span>
      </form>
    </>
  );
}

export default Login;