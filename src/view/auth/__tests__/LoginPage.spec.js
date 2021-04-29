import { render, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../../../state/auth/useAuth";
import LoginPage from "../LoginPage";
import { BrowserRouter } from "react-router-dom";

const cache = {
  get: () => {},
  set: () => {},
  clear: () => {},
};

const customRender = (ui, { props, ...options }) => {
  return render(
    <BrowserRouter>
      <AuthProvider {...props}>{ui}</AuthProvider>
    </BrowserRouter>,
    options
  );
};

describe("View :: auth :: LoginPage", () => {
  describe("View :: auth :: LoginPage", () => {
    it("View :: auth :: LoginPage", () => {
      customRender(<LoginPage />, {
        props: {
          loginUser: jest.fn(),
          cache,
        },
      });
      expect(true).toBe(true);
    });
  });

  describe("quando usuário insere um valor", () => {
    it("preenche o campo com valor inserido", () => {
      const loginUser = jest.fn();
      const { getByDisplayValue, getByPlaceholderText } = customRender(
        <LoginPage />,
        {
          props: {
            loginUser,
            cache,
          },
        }
      );

      fireEvent.change(getByPlaceholderText("Email"), {
        target: {
          value: "email@ambevtech.com.br",
        },
      });

      expect(getByDisplayValue("email@ambevtech.com.br")).toBeInTheDocument();
    });

    describe("quando clica no submit com form preenchido", () => {
      it("chama o loginUser com as informações fornecidas", () => {
        // dica essa função loginUser é do tipo (props, {onSuccess, onError}) => any
        const loginUser = jest.fn();
        const { getByRole, getByPlaceholderText } = customRender(
          <LoginPage />,
          {
            props: {
              loginUser,
              cache,
            },
          }
        );

        fireEvent.change(getByPlaceholderText("Email"), {
          target: {
            value: "email@ambevtech.com.br",
          },
        });

        fireEvent.change(getByPlaceholderText("Password"), {
          target: {
            value: "beerPassword",
          },
        });

        fireEvent.click(getByRole("button", { type: "submit" }));
        expect(loginUser).toHaveBeenCalledWith(
          expect.objectContaining({
            email: "email@ambevtech.com.br",
            password: "beerPassword",
          }),
          expect.anything()
        );
      });
    });
  });

  describe("quando clica no botão submit", () => {
    it("desabilita o botão enquanto espera a ação", () => {
      const loginUser = jest.fn();
      const { getByRole } = customRender(<LoginPage />, {
        props: {
          loginUser,
          cache,
        },
      });
      const buttonSubmit = getByRole("button", { type: "submit" });

      fireEvent.click(buttonSubmit);

      expect(buttonSubmit).toBeDisabled();
    });

    describe("se houver um erro", () => {
      it("renderiza erro", async () => {
        const { findByText, getByRole } = customRender(<LoginPage />, {
          props: {
            loginUser: jest
              .fn()
              .mockImplementationOnce((_, { onError }) =>
                onError(Error("ohno!"))
              ),
            cache,
          },
        });

        const buttonSubmit = getByRole("button", { type: "submit" });

        fireEvent.click(buttonSubmit);

        expect(await findByText("ohno!")).toBeInTheDocument();
      });
    });
  });
});
