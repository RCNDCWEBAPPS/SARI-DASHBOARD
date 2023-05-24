import { useHistory } from 'react-router-dom';

//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import { userSessionExpired } from "../auth";
//import { url } from '../../../../utiles/config'
import { url } from '../../../utiles/config'
import fetch from "isomorphic-fetch";
const AdminApiRequests = () => {
  let token = localStorage.getItem('token')
  const navigate = useHistory();
  const addSales = (sales) => {
    return fetch(`${url}/admin-register-user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(sales),
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const viewAllSales = () => {
    return fetch(`${url}/admin-list-users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const deleteSales = (username) => {
    return fetch(`${url}/admin-delete-user/${username}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const updateSales = (data, id) => {
    return fetch(`${url}/admin-update-user/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  return {
    addSales,
    updateSales,
    viewAllSales,
    deleteSales,

  };
};

export default AdminApiRequests;
