import { useState } from 'react';
import backendApi from '../../../apis/backend';

export default function useSignup() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function signup(userData) {
    setError(false);
    setSigningUp(true);
    setSignupSuccess(false);
    try {
      await backendApi().post('/signup', userData);
      setSigningUp(false);
      setSignupSuccess(true);
    } catch (e) {
      if (e.response) {
        setErrorMessage(e.response.data);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
      setSigningUp(false);
      setError(true);
    }
  }

  return { signup, error, signingUp, errorMessage, signupSuccess };
}
