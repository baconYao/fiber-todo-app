
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch } from 'react-router-dom'

// MUI
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// myself
import theme from './components/ui/Theme';
import DynamicRoute from './utils/DynamicRoute';
import Header from './components/ui/Header';
import Home from './components/ui/Home';
import Account from './components/ui/Account';
import Statistic from './components/ui/Statistic';
import Login from './components/ui/Login';
import { AuthProvider } from './context/auth';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <Container>
              <DynamicRoute exact path="/" component={Home} authenticated/>
              <DynamicRoute path="/profile" component={Account} authenticated/>
              <DynamicRoute path="/statistic" component={Statistic} authenticated/>
              <DynamicRoute path="/login" component={Login} authenticated/>
            </Container>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}