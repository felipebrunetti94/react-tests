const makeUserRepository = ({ conduitService }) => ({
  async add(user) {
    const { data } = await conduitService.post("users", { user });
    return data.user;
  },

  async authBy(userInfo) {
    const { data } = await conduitService.post("users/login", {
      user: userInfo,
    });

    return data.user;
  },
});

export default makeUserRepository;
