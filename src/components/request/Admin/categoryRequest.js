import  { useHistory } from 'react-router-dom';

//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import {  userSessionExpired } from "../auth";
//import { url } from '../../../../utiles/config'
import {url} from '../../../utiles/config'
import fetch from "isomorphic-fetch";
const AdminApiRequests = () => {
      let token = localStorage.getItem('token')
  const navigate = useHistory();
  const addCategory = (sales) => {
    return fetch(`${url}/admin-add-category`, {
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
  const viewAllCategory = () => {
    return fetch(`${url}/admin-list-category`, {
      method: "GET",
      headers: {
        Accept: "application/json",
     Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json()
        
      })
      .catch((err) => err);
  };
  const deleteCategory = (id) => {
    return fetch(`${url}/admin-delete-categorie/${id}`, {
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
  const updateCategory= (data, id) => {
    return fetch(`${url}/admin-update-categorie/${id}`, {
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
    addCategory,
      updateCategory,
    viewAllCategory,
    deleteCategory,
  
  };
};

export default AdminApiRequests;
