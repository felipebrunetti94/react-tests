const makeLoginUser = ({ userRepository }) => {
  return async (userAuthInfo, { onSuccess, onError }) => {
    try {
      const user = await userRepository.authBy(userAuthInfo);
      onSuccess(user);
    } catch (error) {
      onError(error);
    }
  };
};
export default makeLoginUser;
