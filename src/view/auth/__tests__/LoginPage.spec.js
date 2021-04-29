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
  describe("quando usuário insere um valor", () => {
    it("preenche o campo com valor inserido", () => {});

    describe("quando clica no submit com form preenchido", () => {
      it("chama o loginUser com as informações fornecidas", () => {
        // dica essa função loginUser é do tipo (props, {onSuccess, onError}) => any
      });
    });
  });

  describe("quando clica no botão submit", () => {
    it("desabilita o botão enquanto espera a ação", () => {});

    describe("se houver um erro", () => {
      it("renderiza erro", async () => {});
    });
  });
});
