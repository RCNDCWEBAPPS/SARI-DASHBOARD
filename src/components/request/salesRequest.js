import  { useHistory } from 'react-router-dom';

//import { API } from "../config";
//import { getCookie, userSessionExpired } from "./auth";
import {  userSessionExpired } from "./auth";
//import { url } from '../../../../utiles/config'
import {url} from '../../utiles/config'
import fetch from "isomorphic-fetch";
const SalesApiRequests = () => {
      let token = localStorage.getItem('token')
  const navigate = useHistory();
  const salesAddProduct = (data) => {
    return fetch(`${url}/sales-add-products`, {
      method: "POST",
      headers: {
    Authorization: `Bearer ${token}`,
      },
      body: data
    })
      .then((response) => {
        userSessionExpired(response, navigate);
        return response.json();
      })
      .catch((err) => err);
  };
  const salesViewAllProduct = () => {
    return fetch(`${url}/sales-list-products`, {
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
   const salesAddCategory = (sales) => {
    return fetch(`${url}/sales-add-category`, {
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
  const salesViewAllCategory = () => {
    return fetch(`${url}/sales-list-categorie`, {
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
  const deleteCategory = (id) => {
    return fetch(`${url}/sales-delete-categorie/${id}`, {
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
  const salesUpdateCategory= (data, id) => {
    return fetch(`${url}/sales-update-categorie/${id}`, {
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
  const salesUpdateProduct= (data, id) => {
    return fetch(`${url}/sales-update-product/${id}`, {
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
  return {
    salesViewAllProduct,

    salesAddProduct,
    salesUpdateProduct,
    salesAddCategory,
    salesUpdateCategory,
    deleteCategory,
    salesViewAllCategory,
  };
};

export default SalesApiRequests;
