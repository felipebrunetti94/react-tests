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
    });
  });
});
