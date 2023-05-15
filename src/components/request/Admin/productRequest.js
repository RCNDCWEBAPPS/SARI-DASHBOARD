import  { useHistory } from 'react-router-dom';

//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import {  userSessionExpired } from "../auth";
//import { url } from '../../../../utiles/config'
import {url} from '../../../utiles/config'
import fetch from "isomorphic-fetch";
const AdminApiRequests = () => {
  let token = localStorage.getItem("token");
  const navigate = useHistory();
  const addProduct = (product) => {
    return fetch(`${url}/admin-add-products`, {
      method: "POST",
      headers: {
        //"Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const viewAllProduct = () => {
    return fetch(`${url}/admin-list-products`, {
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
  //admin-list-remaningProducts
   const viewRemaningProduct = () => {
     return fetch(`${url}/admin-list-remaningProducts`, {
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
  const viewSaleProduct = () => {
    return fetch(`${url}/admin-list-saleProducts`, {
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
  const updateProduct = (data, id) => {
    return fetch(`${url}/admin-update-products/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
   const deleteProduct = (id) => {
     return fetch(`${url}/admin-delete-product/${id}`, {
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
  return {
    addProduct,
    viewSaleProduct,
    viewAllProduct,
    updateProduct,
    viewRemaningProduct,
    deleteProduct
  };

};

export default AdminApiRequests;
