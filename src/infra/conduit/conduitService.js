import Axios from "axios";

const CONDUIT_URL = `${process.env.REACT_APP_CONDUIT_URL}` || "";

const axios = Axios.create({
  baseURL: CONDUIT_URL,
  headers: { "Content-Type": "application/json; charset=utf-8" },
});

const formatErrors = (errors) => {
  return Object.keys(errors).reduce((acc, key) => {
    return [...errors[key].map((error) => `${key}: ${error}`), ...acc];
  }, []);
};

const extractErrors = (resError) => {
  if (!resError.response) {
    return resError;
  }

  const error = new Error();
  error.details = formatErrors(resError.response.data.errors);
  throw error;
};

const errorWrapper = (request) => async (...args) => {
  try {
    return await request(...args);
  } catch (error) {
    console.error("RequestError", error);
    return extractErrors(error);
  }
};

const withAuth = (options = {}, token) => {
  if (!token) {
    return options;
  }

  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Token ${token}`,
    },
  };
};

const get = errorWrapper(axios.get);
const post = errorWrapper(axios.post);
const put = errorWrapper(axios.put);
const del = errorWrapper(axios.delete);

const conduitService = {
  post,

  get,

  put,

  delete: del,

  async authPost(url, token, data = {}, options) {
    return await post(url, data, withAuth(options, token));
  },

  async authGet(url, token, options) {
    return await get(url, withAuth(options, token));
  },

  async authPut(url, token, data = {}, options) {
    return await put(url, data, withAuth(options, token));
  },

  async authDelete(url, token, options) {
    return await del(url, withAuth(options, token));
  },
};

export default conduitService;
