import { renderHook, act } from "@testing-library/react-hooks";
import { useAuth } from "../useAuth";

describe("State :: Auth :: useAuth", () => {
  describe("quando cache está vazio", () => {
    it("usuário está deslogado", () => {
      const registerUser = jest.fn();
      const loginUser = jest.fn();
      const cache = {
        get: jest.fn(),
        set: jest.fn(),
        clear: jest.fn(),
      };

      const { result } = renderHook(() =>
        useAuth({ registerUser, loginUser, cache })
      );
    });
  });

  describe("quando possui token do usuário no cache", () => {
    it("usuário está logado", () => {
      const registerUser = jest.fn();
      const loginUser = jest.fn();
      const cache = {
        get: jest.fn().mockReturnValueOnce({ token: "usertoken" }),
        set: jest.fn(),
        clear: jest.fn(),
      };
    });
  });

  describe("#userLogin", () => {
    it("entra em loading", () => {
      const registerUser = jest.fn();
      const loginUser = jest.fn();
      const cache = {
        get: jest.fn(),
        set: jest.fn(),
        clear: jest.fn(),
      };

      const { result } = renderHook(() =>
        useAuth({ registerUser, loginUser, cache })
      );

      act(() => {
        result.current.onUserLogin("user");
      });
    });

    describe("quando sucesso", () => {
      const registerUser = jest.fn();
      const loginUser = jest.fn((user, { onSuccess }) => onSuccess(user));
      const cache = {
        get: jest.fn(),
        set: jest.fn(),
        clear: jest.fn(),
      };
    });

    describe("quando falhar", () => {
      const registerUser = jest.fn();
      const loginUser = jest.fn((_, { onError }) => onError("ohno!"));
      const cache = {
        get: jest.fn(),
        set: jest.fn(),
        clear: jest.fn(),
      };
    });
  });

  describe("quando usuario mudar", () => {
    it("atualiza o cache com novo usuário", () => {});
  });

  describe("#onSignOut", () => {});

  describe("#onRegisterUser", () => {});
  describe("#updateAuthInfo", () => {});
});
