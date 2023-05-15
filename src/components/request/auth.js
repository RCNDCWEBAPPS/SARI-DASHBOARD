
import fetch from "isomorphic-fetch";
import {url} from '../../utiles/config'
    let role =localStorage.getItem('role')
export const userSessionExpired = (error, navigate) => {
  
  if (error.status === 401) {

    signout(async () => {
      if(role==='admin'){
      navigate.push(
        "/adminLogin",
        { state: { msg: "Your session is expired. please signin." } },
        { replace: true }
      );
      }
       if(role==='sales'){
  navigate.push(
        "/salesLogin",
        { state: { msg: "Your session is expired. please signin." } },
        { replace: true }
      );
      }
  else if(role==='inspector'){
  navigate.push(
        "/inspectorLogin",
        { state: { msg: "Your session is expired. please signin." } },
        { replace: true }
      );
      }

      // navigate("/login", { replace: true });
    });
  } else {
    return;
  }
};
export const signout = (next) => {
   localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('loginInfo')
    localStorage.removeItem('userInfo')
  next();
  return fetch(`${url}/signout`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err;
    });
};
export const adminForgetPassword = () => {
  return fetch(`${url}/admin-forget-password`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};
export const preSignup = (user) => {
  return fetch(`${url}/pre-signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};
export const signup = (user) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};
export const AdminSignup = (user) => {
  return fetch(`${url}/admin-signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

export const signin = (user) => {
  return fetch(`${url}/signin`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};
export const adminSignin = (user) => {
  return fetch(`${url}/admin-signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};


export const setLocalstorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const removeLocalstorage = (key) => {
  localStorage.removeItem(key);
};
export const forgotPassword = (email) => {
  return fetch(`${url}/forgot-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

export const resetPassword = (resetInfo) => {
  return fetch(`${url}/reset-password`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};
