import React, { useCallback, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useStores } from '../models';
import Cookie from 'universal-cookie';
import Login from './Login';
import Main from './main';
import Pembayaran from './Pembayaran';

const url_string = window.location.href;
const url = new URL(url_string);

const cookie = new Cookie();
const Pages = () => {
  const { app } = useStores();

  const setTokenToState = useCallback(() => {
    const token = cookie.get('PEMTOKEN');

    app.handleState('token', token);
  }, [app]);

  useEffect(() => {
    setTokenToState();
  }, [setTokenToState]);

  return (
    <Router>
      <Switch>
        <Route exact path='/pembayaran-siswa' component={Pembayaran} />
        <PrivateRouteLogin path='/login' isLoggedIn={app.token}>
          <Login />
        </PrivateRouteLogin>
        <PrivateRouteDashboard isLoggedIn={app.token} search={''}>
          <Main />
        </PrivateRouteDashboard>
      </Switch>
    </Router>
  );
};

const PrivateRouteLogin: React.ComponentType<any> = observer(
  ({ children, isLoggedIn, logout, defaultMenu, search, ...rest }) => {
    const checkPatname = (data: {
      location: { state: { from: { pathname: string } } };
    }) => {
      return data.location?.state?.from.pathname || '/';
    };
    return (
      <Route
        {...rest}
        render={(props: {
          location: { state: { from: { pathname: string } } };
        }) =>
          isLoggedIn === '' ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: checkPatname(props),
                state: { from: props.location },
                search: url.search,
              }}
            />
          )
        }
      />
    );
  }
);

const PrivateRouteDashboard: React.ComponentType<any> = ({
  children,
  location,
  isLoggedIn,
}) => {
  return (
    <Route
      path={location.pathname}
      render={({ location }) =>
        isLoggedIn !== '' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/login`,
              state: { from: location },
              search: url.search,
            }}
          />
        )
      }
    />
  );
};

export default observer(Pages);
