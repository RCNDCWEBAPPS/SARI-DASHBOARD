import React from 'react'
import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import Controls from '../../../components/ui/controls/Controls'
import TextField from '@mui/material/TextField'
import { url } from '../../../utiles/config'
import fetch from 'isomorphic-fetch'
import EditIcon from '@mui/icons-material/Edit'
import produce from 'immer'
import Box, { BoxProps } from '@mui/material/Box';
import AdminRequest from "../../../components/request/Admin/productRequest";
export default function ProductDetalis({
  Product,
  setOpenPopup,
  setProducts,
  NotifyMessage,
}) {
  const [product, setProduct] = useState('')
  useEffect(() => {
    setProduct(Product)
  }, [])
    const { viewAllProduct, deleteSales } = AdminRequest();
  console.log(product.name)
  const [quantity, setQuantity] = useState('')
  const handleChange = (e) => {
    setQuantity(e.target.value)
  }
  console.log(quantity * product.price)
  const totalPrice = () => {
    let totalPrice = quantity * product.price
    return totalPrice
  }
  const sendRequest = () => {
    
    updateProductQuantity(quantity).then((data) => {
      console.log(data);
      if (data.product) {
        setOpenPopup(false);
        NotifyMessage({
          message: "Product Sales success.",
          type: "success",
        });
        viewAllProduct().then((data) => {
          if (data.products) {
            ///  console.log(data.products)
            //  setLoading(false)
            setProducts(data.products);
          }
        });
removeProduct(quantity).then((data)=>{
  console.log(data)
})
      }
    });
  }
 const removeProduct = (quantity) => {
   let id = product.id;
   let token = localStorage.getItem("token");
   return fetch(`${url}/${quantity}/admin-removeProduct/${id}`, {
     method: "POST",
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   }).then((response) => {
     return response.json();
   });
 };
  const updateProductQuantity = (quantity) => {
    let id = product.id
        let productQuantity = product.quantity - quantity;
    let token = localStorage.getItem('token')
    return fetch(
      `${url}/${productQuantity}/admin-update-productQuantity/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      return response.json();
    });
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          Product Name:{product.name}
        </Grid>
        <Grid item xs={12} md={6}>
          Frame Materieal:{product.frameMaterieal}
        </Grid>
        <Grid item xs={12} md={6}>
          Price:{product.price}
        </Grid>
        <Grid item xs={12} md={6}>
          {' '}
          Size:{product.size}
        </Grid>
        <Grid item xs={12} md={6}>
          Categorie Name:{product.categoryName}
        </Grid>
        <Grid item xs={12} md={6}>
          {' '}
          Quantity:{product.quantity}
        </Grid>
        <Grid item xs={12} md={6}>
          Modle :{product.modelNo}
        </Grid>
      </Grid>
      <div>
            <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
          justifyContent: 'space-between'
        }}
      >
        <Controls.Input
          label="Quantity"
          type="number"
          value={quantity}
          onChange={handleChange}
        />
        <span>Total Price:{totalPrice()}</span>
        <Controls.Button
          text="Update"
          variant="outlined"
          startIcon={<EditIcon />}
          color="secondary"
          onClick={sendRequest}
        />
        </Box>
      </div>
    </div>
  )
}
