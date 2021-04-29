// @ts-check

import AuthPage from "./AuthPage";
import { Link } from "react-router-dom";
import { AuthContext } from "../../state/auth/useAuth";
import { useContext } from "react";

const LoginPage = () => {
  const {
    onUserLogin,
    error,
    authInfo,
    updateAuthInfo,
    isLoading,
  } = useContext(AuthContext);
  return (
    <AuthPage
      onSubmit={onUserLogin}
      title="Sign in"
      getLink={() => <Link to="/register">Need an account?</Link>}
      error={error}
      updateAuthInfo={updateAuthInfo}
      authInfo={authInfo}
      isLoading={isLoading}
    />
  );
};

export default LoginPage;
