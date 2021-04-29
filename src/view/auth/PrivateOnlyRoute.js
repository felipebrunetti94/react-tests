import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../state/auth/useAuth";

const PrivateOnlyRoute = ({ component: Component, ...rest }) => {
  const { loggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateOnlyRoute;
