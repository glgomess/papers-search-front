import React, { useState, useEffect } from 'react';
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
import { useHistory } from 'react-router-dom';
import useSignup from './hooks/useSignup';
import './signup.scss';
// import { Link as RouterLink } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [invalidInputs, setInvalidInputs] = useState({
    firstName: false,
    lastName: false,
    password: false,
    email: false,
  });

  const { signup, error, signingUp, errorMessage, signupSuccess } = useSignup();
  const history = useHistory();

  useEffect(() => {
    if (signupSuccess) {
      setTimeout(() => {
        history.push('/');
      }, 1000);
    }
  }, [signupSuccess]);

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

  async function validateAndSignup() {
    if (!validateInputs()) {
      return;
    }
    await signup({ email, password, firstName, lastName });
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
                  invalidText="Please insert your name."
                  maxLength="50"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input">
                <TextInput
                  labelText="Last Name"
                  invalid={invalidInputs.lastName}
                  invalidText="Please insert your last name."
                  maxLength="50"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="input">
                <TextInput
                  labelText="Email"
                  invalid={invalidInputs.email}
                  invalidText="Please insert a valid email."
                  maxLength="200"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input">
                <PasswordInput
                  labelText="Password"
                  invalid={invalidInputs.password}
                  invalidText="Please insert your password."
                  maxLength="20"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {signingUp ? (
                <InlineLoading />
              ) : (
                <>
                  <Button
                    size="small"
                    onClick={validateAndSignup}
                    className="signup-button"
                  >
                    Register
                  </Button>
                  <Button
                    size="small"
                    className="go_back-button"
                    onClick={() => history.goBack()}
                    kind="secondary"
                  >
                    Back
                  </Button>
                </>
              )}
              {error ? (
                <>
                  <br />
                  <span className="signup-error">{errorMessage}</span>
                </>
              ) : null}
              {signupSuccess ? (
                <span className="signup-success">Successfully registered!</span>
              ) : null}
            </Tile>
          </Column>
        </Row>
      </Grid>
    </div>
  );
}
