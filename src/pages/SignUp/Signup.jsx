/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  TextInput,
  Tile,
  PasswordInput,
  Link,
  Grid,
  Row,
  Column,
  // Button,
} from 'carbon-components-react';
import { Link as RouterLink } from 'react-router-dom';

export default function Login() {
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
          <Tile>
            <h4 className="form-title">Login</h4>
            <TextInput labelText="Username" />
            <PasswordInput labelText="Password" />
            <Link
              className="recover-link"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <RouterLink to="/recover">Forgot password?</RouterLink>
            </Link>
            {/* <Button kind="primary">Log in</Button> */}

            <Link
              className="new-account-link"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              <RouterLink to="/recover">Create new account</RouterLink>
            </Link>
          </Tile>
        </Column>
      </Row>
    </Grid>
  );
}
