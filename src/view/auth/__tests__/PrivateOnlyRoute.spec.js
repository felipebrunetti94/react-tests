import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import PrivateOnlyRoute from "../PrivateOnlyRoute";
import { AuthProvider } from "../../../state/auth/useAuth";

const customRender = (ui, { props, ...options }) => {
  return render(<AuthProvider {...props}>{ui}</AuthProvider>, options);
};

describe("View :: auth :: PrivateOnlyRoute", () => {
  describe("quando usuário está logado", () => {
    it("vai para página de teste", () => {
      const cache = {
        get: jest.fn().mockReturnValueOnce({ token: "ahuahuauah" }),
        set: () => {},
        clear: () => {},
      };

      const history = createMemoryHistory();
      const route = "/test";
      history.push(route);

      customRender(
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <h1>Login Page</h1>
            </Route>
            <PrivateOnlyRoute
              exact
              path="/test"
              component={() => <h1>Test Page</h1>}
            />
          </Switch>
        </Router>,
        {
          props: {
            cache,
          },
        }
      );
    });
  });

  describe("quando usuário não está logado", () => {
    it("vai para página de login", () => {
      const cache = {
        get: jest.fn(),
        set: () => {},
        clear: () => {},
      };

      const history = createMemoryHistory();
      const route = "/test";
      history.push(route);
      customRender(
        <Router history={history}>
          <Switch>
            <Route exact path="/login">
              <h1>Login Page</h1>
            </Route>
            <PrivateOnlyRoute
              exact
              path="/test"
              component={() => <h1>Test Page</h1>}
            />
          </Switch>
        </Router>,
        {
          props: {
            cache,
          },
        }
      );
    });
  });
});
