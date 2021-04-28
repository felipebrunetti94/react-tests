const makeRegisterUSer = ({ userRepository }) => {
  return async (userInfo, { onSuccess, onError }) => {
    try {
      const newUser = await userRepository.add(userInfo);

      onSuccess(newUser);
    } catch (error) {
      onError(error);
    }
  };
};

export default makeRegisterUSer;
