import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
console.log(BASE_URL);

/**
 * Gets the headers.
 *
 */
const getHeaders = () => {
  let authToken = localStorage.auth_token ? localStorage.auth_token : null;

  let config = {
    headers: {
      Accept: "application/json",
    },
  };
  if (authToken) {
    config.headers.authorization = `barrer ${authToken}`;
  }

  return config;
};

/**
 * Post request from axios
 */
const axiosPost = async (data, url) => {
  try {
    let request = await axios.post(`${BASE_URL}/${url}`, data, getHeaders());
    if (request.data && request.data.message) {
      alert("Add sucessfully");
    }
    return request;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Get call from Axios
 */
const axiosGet = async (url) => {
  try {
    return await axios.get(`${BASE_URL}/${url}`, getHeaders());
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Delete call from axios
 */
const axiosDelete = async (url) => {
  let request = await axios.delete(`${BASE_URL}/${url}`, getHeaders());
  if (request.data && request.data.message) {
    alert("delete sucessfully");
  }
  return request;
};

const axiosPut = async (data, url) => {
  try {
    let request = await axios.put(`${BASE_URL}/${url}`, data, getHeaders());

    if (request.data && request.data.message) {
      alert("Update sucessfully");
    }
    return request;
  } catch (error) {
    throw error.response.data;
  }
};

export { axiosGet, axiosPost, axiosDelete, axiosPut };
