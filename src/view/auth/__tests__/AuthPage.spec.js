import { fireEvent, render } from "@testing-library/react";
import AuthPage from "../AuthPage";

describe("View :: Auth :: AuthPage", () => {
  describe("quando clica no botão submit", () => {
    it("passa para o onSubmit as info do usuário", () => {
      const onSubmit = jest.fn();
      const authInfo = "auth info";
      const props = {
        title: "test",
        showUsername: true,
        onSubmit,
        isLoading: false,
        error: {},
        updateAuthInfo: () => {},
        authInfo,
      };
      const { getByRole } = render(<AuthPage {...props} />);
      fireEvent.click(getByRole("button", { type: "submit" }));
      expect(onSubmit).toHaveBeenCalledWith(authInfo);
    });
  });

  describe("quando atualiza um campo", () => {
    it("chama o  Update Auth Info com nome e valor do campo atualizado", () => {
      const updateAuthInfo = jest.fn();
      const props = {
        title: "test",
        showUsername: true,
        onSubmit: () => {},
        isLoading: false,
        error: {},
        updateAuthInfo,
        authInfo: {},
      };
      const { getByPlaceholderText } = render(<AuthPage {...props} />);

      fireEvent.change(getByPlaceholderText("Your Name"), {
        target: {
          value: "text",
        },
      });

      expect(updateAuthInfo).toHaveBeenCalledWith({ username: "text" });
    });
  });

  describe("quando receber a prop showUserName", () => {
    it("mostra o campo username", () => {
      const props = {
        title: "test",
        showUsername: true,
        onSubmit: () => {},
        isLoading: false,
        error: {},
        updateAuthInfo: () => {},
        authInfo: {},
      };
      const { getByPlaceholderText } = render(<AuthPage {...props} />);
      expect(getByPlaceholderText("Your Name")).toBeInTheDocument();
    });
  });

  describe("quando estiver em loading", () => {
    it("o botão submit deve estar desabilitado", () => {
      const props = {
        title: "test",
        showUsername: true,
        onSubmit: () => {},
        isLoading: true,
        error: {},
        updateAuthInfo: () => {},
        authInfo: {},
      };
      const { getByRole } = render(<AuthPage {...props} />);

      expect(getByRole("button", { type: "submit" })).toBeDisabled();
    });
  });

  describe("quando recebe a prop error", () => {
    it("deve mostrar o erro", () => {
      const props = {
        title: "test",
        showUsername: true,
        onSubmit: () => {},
        isLoading: false,
        error: { message: "ohno!" },
        updateAuthInfo: () => {},
        authInfo: {},
      };
      const { getByText } = render(<AuthPage {...props} />);

      expect(getByText("ohno!")).toBeInTheDocument();
    });
  });
});
