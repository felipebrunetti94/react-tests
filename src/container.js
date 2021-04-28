import conduitService from "./infra/conduit/conduitService";
import makeUserRepository from "./infra/user/userRepository";
import makeRegisterUser from "./app/user/registerUser";
import makeLoginUser from "./app/user/loginUser";

// -- INFRA --/
const userRepository = makeUserRepository({ conduitService });

// -- USE CASES --/
export const registerUser = makeRegisterUser({ userRepository });
export const loginUser = makeLoginUser({ userRepository });
