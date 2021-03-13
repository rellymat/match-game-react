import jwtDecode from "jwt-decode";
import http from "./httpService";
import { Api } from "../config.json";

const apiEndpoint = Api + "auth";
const tokenKey = "token";

http.setJwt(getJwt());

export function deleteUser(user) {
  return http.delete(apiEndpoint + '/delete', {
    data: {
      user
    }
  }
  )
}

export function signup(user) {
  return http.post(apiEndpoint + "/signup", user)
}

export async function login({ username, password }) {
  const { data: jwt } = await http.post(apiEndpoint + '/login', { username, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
