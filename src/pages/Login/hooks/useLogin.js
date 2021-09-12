import { useState } from 'react';
import backendApi from '../../../apis/backend';

export default function useLogin() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validatingUser, setValidatingUser] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(false);

  async function login(email, password) {
    try {
      setError(false);
      setValidatingUser(true);
      await backendApi().post('/login', { email, password });
      setValidatingUser(false);
      setSuccessfulLogin(true);
    } catch (e) {
      setValidatingUser(false);
      setError(true);
      if (e.response) {
        setErrorMessage(e.response.data);
      }
    }
  }

  return { login, errorMessage, validatingUser, error, successfulLogin };
}
