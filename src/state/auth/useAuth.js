import { useReducer, createContext, useMemo, useEffect } from "react";
import initialState from "./initialState";
import * as AUTH from "./types";
import reducer from "./reducer";

export const AuthContext = createContext(null);

const AUTH_KEY = "AUTH";

export const useAuth = ({ registerUser, loginUser, cache }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const stored = cache.get(AUTH_KEY);
    if (stored) {
      return { ...init, user: stored };
    }
    return init;
  });

  useEffect(() => {
    cache.set(AUTH_KEY, state.user);
  }, [state.user, cache]);

  const value = useMemo(() => {
    const onRegisterUser = (authInfo) => {
      dispatch({ type: AUTH.REGISTER_USER_REQUEST });
      return registerUser(authInfo, {
        onSuccess: (user) =>
          dispatch({ type: AUTH.REGISTER_USER_REQUEST_SUCCESS, user }),
        onError: (error) =>
          dispatch({ type: AUTH.REGISTER_USER_REQUEST_ERROR, error }),
      });
    };

    const onUserLogin = (authInfo) => {
      dispatch({ type: AUTH.LOGIN_USER_REQUEST });
      return loginUser(authInfo, {
        onSuccess: (user) =>
          dispatch({ type: AUTH.LOGIN_USER_REQUEST_SUCCESS, user }),
        onError: (error) =>
          dispatch({ type: AUTH.LOGIN_USER_REQUEST_ERROR, error }),
      });
    };

    const updateAuthInfo = (authInfo) =>
      dispatch({ type: AUTH.UPDATE_AUTH_INFO, authInfo });

    const onSignOut = () => {
      dispatch({ type: AUTH.SIGN_OUT });
      cache.clear(AUTH_KEY);
    };

    return {
      ...state,
      loggedIn: !!state.user.token,
      updateAuthInfo,
      onRegisterUser,
      onUserLogin,
      onSignOut,
    };
  }, [state, dispatch, registerUser, loginUser, cache]);

  return value;
};

export const AuthProvider = ({ children, registerUser, loginUser, cache }) => {
  const value = useAuth({ registerUser, loginUser, cache });
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
