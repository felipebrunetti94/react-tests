import makeUserRepository from "../userRepository";

describe("Infra :: User :: userRepository", () => {
  let userRepository;
  let conduitService;
  const successResponse = { data: { user: "user" } };
  const errorResponse = { errors: ["nope!", "ohno!"] };

  describe("#add", () => {
    it("usa a service do conduit service para fazer a request", async () => {
      conduitService = {
        post: jest.fn().mockResolvedValue(successResponse),
      };
      userRepository = makeUserRepository({ conduitService });
      await userRepository.add("user");
      expect(conduitService.post).toHaveBeenCalledWith("users", {
        user: "user",
      });
    });

    describe("quando suceder", () => {
      it("resolves com o usuario", () => {
        conduitService = {
          post: jest.fn().mockResolvedValue(successResponse),
        };

        userRepository = makeUserRepository({ conduitService });

        return expect(userRepository.add("user")).resolves.toEqual("user");
      });
    });

    describe("quando falhar", () => {
      it("rejects com error", () => {
        conduitService = {
          post: jest.fn().mockRejectedValue(errorResponse),
        };
        userRepository = makeUserRepository({ conduitService });

        return expect(userRepository.add("user")).rejects.toEqual({
          errors: ["nope!", "ohno!"],
        });
      });
    });
  });

  describe("#authBy", () => {
    it("usa a service do conduit service para fazer a request", async () => {
      conduitService = {
        post: jest.fn().mockResolvedValue(successResponse),
      };
      userRepository = makeUserRepository({ conduitService });
      await userRepository.authBy("userInfo");
      expect(conduitService.post).toHaveBeenCalledWith("users/login", {
        user: "userInfo",
      });
    });

    describe("quando suceder", () => {
      it("resolves com usuário", () => {
        conduitService = {
          post: jest.fn().mockResolvedValue(successResponse),
        };
        userRepository = makeUserRepository({ conduitService });

        return expect(userRepository.authBy("userInfo")).resolves.toEqual(
          "user"
        );
      });
    });

    describe("quando falhar", () => {
      it("rejects com error", () => {
        conduitService = {
          post: jest.fn().mockRejectedValue(errorResponse),
        };
        userRepository = makeUserRepository({ conduitService });

        return expect(userRepository.authBy("user")).rejects.toEqual({
          errors: ["nope!", "ohno!"],
        });
      });
    });
  });
});
