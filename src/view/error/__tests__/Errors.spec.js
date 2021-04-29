import { render } from "@testing-library/react";
import Errors from "../Errors";

describe("View :: error :: Errors", () => {
  describe("quando recebe um erro com detalhes", () => {
    it("renderiza lista de erros", () => {
      const { getByTestId } = render(
        <Errors error={{ details: ["ohno!", "nope!"] }} />
      );
      expect(getByTestId("errors")).toBeInTheDocument(/ohono!/);
      expect(getByTestId("errors")).toBeInTheDocument(/nope!/);
    });
  });

  describe("quando recebe um erro com uma mensagem", () => {
    it("renderiza um erro", () => {
      const { getByTestId } = render(<Errors error={{ message: "ohno!" }} />);
      expect(getByTestId("errors")).toBeInTheDocument(/ohono!/);
    });
  });

  describe("quando recebe um objeto vazio", () => {
    it("renderiza nada", () => {
      const { container } = render(<Errors error={{}} />);
      expect(container).toBeEmptyDOMElement();
    });
  });
});
