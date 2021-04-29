import makeUserRepository from "../userRepository";

describe("Infra :: User :: userRepository", () => {
  let userRepository;
  let conduitService;
  const successResponse = { data: { user: "user" } };
  const errorResponse = { errors: ["nope!", "ohno!"] };

  describe("#add", () => {
    it("usa a service do conduit service para fazer a request", async () => {
      // resolver com async await
      conduitService = {
        post: jest.fn().mockResolvedValue(successResponse),
      };
      userRepository = makeUserRepository({ conduitService });
    });

    describe("quando suceder", () => {
      it("resolves com o usuario", () => {
        // resolver com async await
        conduitService = {
          post: jest.fn().mockResolvedValue(successResponse),
        };
      });
    });

    describe("quando falhar", () => {
      it("rejects com error", () => {});
    });
  });

  describe("#authBy", () => {
    it("usa a service do conduit service para fazer a request", async () => {});

    describe("quando suceder", () => {
      it("resolves com usuário", () => {});
    });

    describe("quando falhar", () => {
      it("rejects com error", () => {});
    });
  });
});
