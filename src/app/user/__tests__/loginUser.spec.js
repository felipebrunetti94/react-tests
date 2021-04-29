import makeLoginUser from "../loginUser";

describe("App :: User :: loginUser", () => {
  let registerUSer;
  let mockUserRepository;
  const userAuth = "userAuth";

  it("passa as infos do usuário para o userRepository", async () => {
    mockUserRepository = {
      authBy: jest.fn(),
    };

    registerUSer = makeLoginUser({
      userRepository: mockUserRepository,
    });

    await registerUSer(userAuth, { onSuccess: () => {}, onError: () => {} });

    expect(mockUserRepository.authBy).toBeCalledWith(userAuth);
  });

  describe("quando suceder", () => {
    beforeEach(() => {
      mockUserRepository = {
        authBy: jest.fn(() => Promise.resolve("signedUser")),
      };
      registerUSer = makeLoginUser({ userRepository: mockUserRepository });
    });

    it("chama o onSuccess callback com o usuário", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      await registerUSer(userAuth, { onSuccess, onError });

      expect(onSuccess).toBeCalledWith("signedUser");
      expect(onError).not.toBeCalled();
    });
  });

  describe("quando falhar", () => {
    beforeEach(() => {
      mockUserRepository = {
        authBy: jest.fn(() => Promise.reject(new Error("error!"))),
      };
      registerUSer = makeLoginUser({ userRepository: mockUserRepository });
    });

    it("chama o onError callback com o erro", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      await registerUSer(userAuth, { onSuccess, onError });

      expect(onError).toBeCalledWith(new Error("error!"));
      expect(onSuccess).not.toBeCalled();
    });
  });
});
