import React from 'react'
import { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import Controls from '../../components/ui/controls/Controls'
import TextField from '@mui/material/TextField'
import { url } from '../../utiles/config'
import fetch from 'isomorphic-fetch'
import EditIcon from '@mui/icons-material/Edit'
import produce from 'immer'
import Box, { BoxProps } from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SalesRequest from "../../components/request/salesRequest";
import { Text } from 'recharts'
import axios from 'axios'
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
  console.log(product.quantity)

  const { salesViewAllProduct } = SalesRequest();
  const [quantity, setQuantity] = useState()
  const formData = new FormData();
  const [description, setDescriepiton] = useState('')
  const [price, setPrice] = useState()
  const [date, setDate] = useState('')
  const [open, setOpen] = useState(false)
  const handleChange = (e) => {

    setQuantity(e.target.value)


  }
  const PriceChange = (e) => {
    setPrice(e.target.value)
  }

  const DateChange = (e) => {
    console.log(e.target.value)
    setDate(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescriepiton(e.target.value)

  }
  const totalPrice = () => {

    let totalPrice = quantity * price
    return totalPrice
  }
  let orginalQuantity = parseInt(product.quantity)
  const sendRequest = async () => {
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("date", date)

    if (quantity > orginalQuantity) {
      setOpen(true)
    }
    else {

      updateProductQuantity(quantity).then((data) => {
        console.log(data);
        if (data.product) {
          setOpenPopup(false);
          NotifyMessage({
            message: "Product Sales success.",
            type: "success",
          });
          salesViewAllProduct().then((data) => {
            if (data.products) {
              setProducts(data.products);
            }
          });
          //sales-removeProduct
          removeProduct(formData, quantity).then((data) => {
            console.log(data);
          });
        }
      });
    }
  }
  const removeProduct = (data, quantity) => {
    let id = product.id;
    let token = localStorage.getItem("token");
    axios.post(`${url}/${quantity}/sales-removeProduct/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      description: description,
      date:date,
      price:price
    },
    ).then((response) => {
      console.log(response)
    })

  };

  const updateProductQuantity = (quantity) => {

    let id = product.id
    let productQuantity = product.quantity - quantity;
    let token = localStorage.getItem('token')
    return fetch(
      `${url}/${productQuantity}/sales-update-productQuantity/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },

      }
    ).then((response) => {
      return response.json();
    });
  }
  return (
    <div>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Only {product.quantity} items available store!
        </Alert>
      </Collapse>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          Product Name:{product.name}
        </Grid>
        <Grid item xs={12} md={6}>
          Frame Materieal:{product.frameMaterieal}
        </Grid>
        {/* <Grid item xs={12} md={6}>
          Price:{product.price}
        </Grid> */}
        <Grid item xs={12} md={6}>
          {" "}
          Size:{product.size}
        </Grid>
        <Grid item xs={12} md={6}>
          Categorie Name:{product.categoryName}
        </Grid>
        <Grid item xs={12} md={6}>
          {" "}
          Quantity:{product.quantity}
        </Grid>
        <Grid item xs={12} md={6}>
          Modle :{product.modelNo}
        </Grid>
      </Grid>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            gap:"60px"
          }}
        >
          <Controls.Input
            label="Price"
            type="number"
            value={price}
            onChange={PriceChange}
          />
          <Controls.Input
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            gap: "60px"
          }}
        >
          <Controls.Input
            multiline
            maxRows={4}
            value={description}
            onChange={handleDescriptionChange}
            label="Description"
            rows={3}
          />
          <Controls.Input
            label="Date"
            type="date"
            value={date}
            onChange={DateChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            gap:"60px"

          }}
        >
          <span>Total Price:{quantity ? totalPrice() : 0}</span>
          <Controls.Button
           
            text="Update"
            // variant="outlined"
            startIcon={<EditIcon />}
            color="secondary"
            onClick={sendRequest}
          />
        </Box>
      </div>
    </div>
  );
}
