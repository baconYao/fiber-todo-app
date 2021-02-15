/*
  ref
    - https://github.com/react-hook-form/react-hook-form/blob/master/examples/parseFormatInputValues.tsx
    - https://medium.com/@andresss/using-material-ui-with-react-hook-form-is-this-simple-d8383941fafe
    - https://github.com/ammartinwala52/hook-form-mui
    - https://github.com/anselm94/googlekeepclone/blob/master/web/src/components/Login.js
*/

import React from 'react';
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

// MUI
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

// myself
import { useAuthDispatch } from '../../context/auth';

const useStyles = makeStyles(theme => ({
  pageWrapper: {
      height: "100vh",
      display: "flex",
      flexDirection: "column"
  },
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: "1",
},
}));


export default function Login() {
  const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
  const classes = useStyles();
  const dispatch = useAuthDispatch();

  const doLogin = async ({email, password}) => {
    try {
      const res = await axios.post('/api/login', {
        email,
        password
      });

      // 登入完成後，處理 token
      // encodedToken is in res.data object
      dispatch({ type: 'LOGIN', payload: res.data });
      // 登入完成後，refresh page
      window.location.href = '/';
    } catch (error) {
      if (error.response.status == 401) {
        console.log(error.response.data.errorMsg);
      }
    }
  }

  const onLoginClick = (data) => {
    // console.log("data", data);
    doLogin(data);
  }

  return (
    <div className={classes.pageWrapper}>
      <Container maxWidth="md" className={classes.pageContainer}>
        <Paper elevation={3}>
          <form onSubmit={handleSubmit(onLoginClick)}>
            <FormControl fullWidth variant="outlined">
              <Controller
                name="email"
                as={
                  <TextField
                    id="email"
                    helperText={fieldsErrors.email ? fieldsErrors.email.message : null}
                    variant="outlined"
                    label="Email"
                    error={fieldsErrors.email}
                  />
                }
                control={control}
                defaultValue=""
                rules={{
                  required: 'Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'invalid email address'
                  }
                }}
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant="outlined">
              <Controller
                name="password"
                as={
                  <TextField
                    id="password"
                    type="password"
                    helperText={fieldsErrors.password ? fieldsErrors.password.message : null}
                    variant="outlined"
                    label="Password"
                    error={fieldsErrors.password}
                  />
                }
                control={control}
                defaultValue=""
                rules={{
                  required: 'Required'
                }}
              />
            </FormControl>
            <Button
              type="submit"
              // disabled={loading || email === "" || password === ""}
              variant="contained"
              color="secondary"
              disableElevation
              fullWidth
              size="large"
            >
              登入
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
