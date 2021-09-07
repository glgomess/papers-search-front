import React, { useState } from 'react';
import {
  TextInput,
  Tile,
  PasswordInput,
  Grid,
  Row,
  Column,
  InlineLoading,
  Button,
} from 'carbon-components-react';
import useSignup from './hooks/useSignup';
import './signup.scss';
// import { Link as RouterLink } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [validatingUser, setValidatingUser] = useState(false);
  const [invalidInputs, setInvalidInputs] = useState({
    firstName: false,
    lastName: false,
    password: false,
    email: false,
  });

  const { signup } = useSignup();

  /**
   *
   * Checks if all inputs are valid. If so, returns true. If not, returns false.
   */
  function validateInputs() {
    let invalidEmail = false;
    let invalidPassword = false;
    let invalidFirstName = false;
    let invalidLastName = false;

    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.toLowerCase()
      )
    ) {
      invalidEmail = true;
    }

    if (password.length <= 0) {
      invalidPassword = true;
    }

    if (firstName.length <= 0) {
      invalidFirstName = true;
    }

    if (lastName.length <= 0) {
      invalidLastName = true;
    }

    setInvalidInputs({
      password: invalidPassword,
      email: invalidEmail,
      firstName: invalidFirstName,
      lastName: invalidLastName,
    });

    if (
      invalidEmail ||
      invalidFirstName ||
      invalidLastName ||
      invalidPassword
    ) {
      return false;
    }

    return true;
  }

  function validateAndSignup() {
    if (!validateInputs()) {
      return;
    }
    signup();
    setValidatingUser(true);
  }

  return (
    <div className="background-gradient">
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
              <h4 className="form-title">Sign Up</h4>
              <div className="input">
                <TextInput
                  labelText="First Name"
                  invalid={invalidInputs.firstName}
                  invalidText="Please type your name."
                  maxLength="20"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input">
                <TextInput
                  labelText="Last Name"
                  invalid={invalidInputs.lastName}
                  invalidText="Please type your last name."
                  maxLength="20"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input">
                <TextInput
                  labelText="Email"
                  invalid={invalidInputs.email}
                  invalidText="Please type your email correctly."
                  maxLength="30"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <PasswordInput
                  labelText="Password"
                  invalid={invalidInputs.password}
                  invalidText="Please type your password."
                  maxLength="20"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {validatingUser ? (
                <InlineLoading />
              ) : (
                <Button
                  size="small"
                  className="login-button"
                  onClick={validateAndSignup}
                >
                  Register
                </Button>
              )}
            </Tile>
          </Column>
        </Row>
      </Grid>
    </div>
  );
}
