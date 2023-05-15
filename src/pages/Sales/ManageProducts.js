import React from 'react'
import Norecords from '../../components/ui/Norecords'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Grid, InputAdornment, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useTable from '../../components/ui/useTable'
import Notification from '../../components/ui/Notification'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import Notify from '../../components/ui/Notify'
import Popup from '../../components/ui/Popup'
import Controls from '../../components/ui/controls/Controls'
import { Search, Add } from '@mui/icons-material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import produce from 'immer'
import Avatar from "@mui/material/Avatar";
import PageSpinner from '../../components/ui/PageSpinner'
import OftadehLayout from '../../components/Layout/Layout'
import OftadehBreadcrumbs from '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import { makeStyles, TextField } from '@material-ui/core'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SalesRequest from '../../components/request/salesRequest'
import ProductForm from '../../components/forms/productForm'
import ProductPage from './ProductDetailes'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  my3: {
    margin: '1.3rem 0',
  },
  mb3: {
    margin: '1.3rem 0',
  },
  mb0: {
    marginBottom: 0,
  },
  mRight: {
    marginRight: '.85rem',
  },
  p1: {
    padding: '.85rem',
  },
  borderTextField: {
    marginRight: '20px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#203040',
      },
      '&:hover fieldset': {
        borderColor: '#203040',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#203040',
        label: {
          display: 'none',
        },
      },
    },
  },
  formLabel: {
    color: '#203040',
    '&.Mui-focused': {
      color: '#203040',
    },
  },
  button: {
    backgroundColor: '#203040',
    color: 'white',
    fontFamily: 'Times New Roman',
  },
}))

const headCells = [
  { id: "name", label: "Name" },
  { id: "color", label: "Color" },
  { id: "code", label: "Code" },
  { id: "price", label: "Unit price" },
  { id: "quantity", label: "Quantity" },
  { id: "image", label: "Image" },
  { id: "actions", label: "Actions", disableSorting: true },
];
const Products = (props) => {
  const { history } = props
  const classes = useStyles()
  const [openPopup, setOpenPopup] = useState(false)
  const [Q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const { NotifyMessage, notify, setNotify } = Notify()
  const { salesViewAllProduct } = SalesRequest();
  const [products, setProducts] = useState([])
  console.log(products)
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items
    },
  })
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })
  const [singleRanch, setSingleRanch] = useState([])
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(products, headCells, filterFn)
const[role,setRole]=useState('')
  useEffect(() => {
    setRole(localStorage.getItem('role'))
    salesViewAllProduct().then((data) => {
      console.log(data);
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: "error",
        });
      } else if (data.products) {
        console.log(data.products);
        setLoading(false);
        setProducts(data.products);
      }
    });
  }, [])

  useEffect(() => {
    setFilterFn({
      fn: (items) => {
        const columns = ['name', 'color', 'categoryName']

        if (Q === '') return items
        else {
          return items.filter((x) => {
            return columns.some((column) => {
              return x[column].toString().toLowerCase().includes(Q)
            })
          })
        }
      },
    })
  }, [Q])
  const[productImage,setProductImage]=useState([])
  console.log(productImage)
  const openInPopup = (item) => {
    setProductImage(...item.ProductImages);
    setRecordForEdit({ ...item, editing: true })
    setOpenPopup(true)
  }
  const [product, setProduct] = useState()
  const [openProduct, setOPenProduct] = useState(false)
  const handleSale = (id) => {
    setProduct(id)
    setOPenProduct(true)
  }
  return (
    <OftadehLayout>
      <Typography className={classes.mb3} variant="h5" component="h1">
        Products Mangement
      </Typography>
      <OftadehBreadcrumbs path={history} />
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Controls.Input
              label="Search Product"
              fullWidth
              value={Q}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setQ(e.target.value.trimLeft().toLowerCase());
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controls.Button
              text="Add New"
              variant="outlined"
              startIcon={<Add />}
              color="secondary"
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
          </Grid>
        </Grid>
      </Toolbar>
      {loading ? (
        <PageSpinner />
      ) : (
        <>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().length > 0 ? (
                recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.modelNo}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    {item.ProductImages.map((product) => (
                      <TableCell>
                        <Avatar
                          alt="Remy Sharp"
                          src={product.imageURI}
                          sx={{ width: 56, height: 56 }}
                        />
                      </TableCell>
                    ))}

                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        title="Update"
                        size="small"
                        variant="contained"
                        onClick={() => {
                          openInPopup(item);
                        }}
                      >
                        <EditIcon fontSize="medium" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        title="Sale"
                        size="small"
                        onClick={() => {
                          handleSale(item);
                        }}
                      >
                        <ShoppingCartIcon fontSize="medium" />
                      </Controls.ActionButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <Norecords col={5} />
              )}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </>
      )}

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Notification notify={notify} setNotify={setNotify} />
      <Popup
        title="Product Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProductForm
          role={role}
          NotifyMessage={NotifyMessage}
          setOpenPopup={setOpenPopup}
          recordForEdit={recordForEdit}
          setProducts={setProducts}
          productImage={productImage}
        />
      </Popup>
      <Popup
        title="Product Detaile"
        openPopup={openProduct}
        setOpenPopup={setOPenProduct}
      >
        <ProductPage
          NotifyMessage={NotifyMessage}
          setOpenPopup={setOPenProduct}
          Product={product}
          setProducts={setProducts}
        />
      </Popup>
    </OftadehLayout>
  );
}

export default Products
