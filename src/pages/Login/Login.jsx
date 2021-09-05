/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  TextInput,
  Tile,
  PasswordInput,
  Link,
  Grid,
  Row,
  Column,
  Button,
  InlineLoading,
} from 'carbon-components-react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import useLogin from './hooks/useLogin';
import './login.scss';

export default function Login() {
  const { validateLogin } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [invalidInputs, setInvalidInputs] = useState({
    username: false,
    password: false,
  });
  const [validatingUser, setValidatingUser] = useState(false);

  const history = useHistory();

  async function validateInputs() {
    let invalidPassword = false;
    let invalidUsername = false;

    if (password.length === 0) {
      invalidPassword = true;
    }

    if (username.length === 0) {
      invalidUsername = true;
    }

    setInvalidInputs({ password: invalidPassword, username: invalidUsername });

    if (invalidPassword || invalidUsername) {
      return;
    }

    try {
      setValidatingUser(true);
      await validateLogin(username, password);
      setValidatingUser(false);
      history.push('/home');
    } catch (e) {
      setValidatingUser(false);
    }
  }

  return (
    <Grid>
      <Row>
        <Column lg={{ span: 8, offset: 2 }}>
          <h3 className="title">
            Welcome to the HCI Papers Search and Analysis Platform!
          </h3>
        </Column>
      </Row>
      <Row>
        <Column lg={{ span: 4, offset: 4 }}>
          <Tile className="tile">
            <h4 className="form-title">Login</h4>
            <TextInput
              labelText="Username"
              onChange={(e) => setUsername(e.target.value)}
              invalid={invalidInputs.username}
              invalidText="Please check your username."
            />
            <PasswordInput
              labelText="Password"
              onChange={(e) => setPassword(e.target.value)}
              invalid={invalidInputs.password}
              invalidText="Please check your password."
            />
            {validatingUser ? (
              <InlineLoading />
            ) : (
              <Button
                size="small"
                className="login-button"
                onClick={validateInputs}
              >
                Login
              </Button>
            )}

            <Link
              className="recover-link"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <RouterLink to="/recover">Forgot password?</RouterLink>
            </Link>
            <Link
              className="new-account-link"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <RouterLink to="/signup">Create new account</RouterLink>
            </Link>
          </Tile>
        </Column>
      </Row>
    </Grid>
  );
}
