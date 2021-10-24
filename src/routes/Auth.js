import React, { useState } from 'react';
import { AuthService, firebaseInstance } from '../firebaseInstance';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewAccount, setIsNewAccount] = useState(false);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if (isNewAccount) {
        data = await AuthService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await AuthService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setIsNewAccount(!isNewAccount);

  const socialAccount = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    /* 구글과 깃허브 이메일이 동일하면 안됨 */
    await AuthService.signInWithPopup(provider)
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        {isNewAccount ? (
          <input type="submit" value={'Sign Up'} />
        ) : (
          <input type="submit" value={'Sign In'} />
        )}
        {error}
      </form>
      <span onClick={toggleAccount}>
        {isNewAccount ? 'Sign In' : 'Sign Up'}
      </span>
      <button onClick={socialAccount} name="google">
        Google로 계속하기
      </button>
      <button onClick={socialAccount} name="github">
        Github로 계속하기
      </button>
    </div>
  );
};

export default Auth;
