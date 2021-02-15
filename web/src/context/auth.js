import React, { createContext, useReducer, useContext } from 'react';
import jwtDecode from 'jwt-decode';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

let user = null;
const token = localStorage.getItem('token');
if (token) {
  const decodedToken = jwtDecode(token);
  // decodedToken.exp 的單位是 millisecond
  const expiresAt = new Date(decodedToken.exp * 1000);

  // token 過期
  if (new Date() > expiresAt) {
    localStorage.removeItem('token');
  } else {
    user = decodedToken;
  }
} else console.log('No token found');

const authReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
      // 儲存 jwt token 在 localstorage
      localStorage.setItem('token', action.payload.encodedToken);
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user });
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);