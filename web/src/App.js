
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch } from 'react-router-dom'

// MUI
import { ThemeProvider } from '@material-ui/core/styles';

// myself
import theme from './components/ui/Theme';
import DynamicRoute from './utils/DynamicRoute';
import Header from './components/ui/Header';
import Home from './components/ui/Home';
import Account from './components/ui/Account';
import Statistic from './components/ui/Statistic';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.users)
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <DynamicRoute exact path="/" component={Home} authenticated/>
          <DynamicRoute path="/profile" component={Account} authenticated/>
          <DynamicRoute path="/statistic" component={Statistic} authenticated/>
        </Switch>
      </BrowserRouter>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul> */}
      
    </ThemeProvider>
  );
}