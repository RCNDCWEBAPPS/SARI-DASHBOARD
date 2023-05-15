import React from 'react'
import ContentWrapper from '../../../components/ui/ContentWrapper'
import Norecords from '../../../components/ui/Norecords'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Popup from "../../../components/ui/Popup";
import { Grid, InputAdornment, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useTable from '../../../components/ui/useTable'
import Notification from '../../../components/ui/Notification'
import ConfirmDialog from '../../../components/ui/ConfirmDialog'
import Notify from '../../../components/ui/Notify'
import Controls from '../../../components/ui/controls/Controls'
import { Search, Add } from '@mui/icons-material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import produce from 'immer'
import Avatar from "@mui/material/Avatar";
import { useHistory } from 'react-router'
import PageSpinner from '../../../components/ui/PageSpinner'
import OftadehLayout from '../../../components/Layout/Layout'
import OftadehBreadcrumbs from '../../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import { makeStyles, TextField } from '@material-ui/core'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminRequest from '../../../components/request/Admin/productRequest'
import ProductForm from '../../../components/forms/productForm'
import ProductPage from './productDetalis'

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
  { id: "frameMaterieal", label: "Frame Materieal" },
  { id: "categoryName", label: "Categorie Name" },
  { id: "price", label: "Price" },
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
  const { viewAllProduct, deleteProduct } = AdminRequest();
  const [products, setProducts] = useState([])
  console.log(products)
    const navgate = useHistory()
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

  useEffect(() => {
    viewAllProduct().then((data) => {
      console.log(data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      }
        else if(data.message){
             NotifyMessage({
          message: data.message,
          type: 'error',
        })
         navgate.push(`/`)
        }
      else if (data.products) {
        console.log(data.products)
        setLoading(false)
        setProducts(data.products)
      }
    })
  }, [])

  useEffect(() => {
    setFilterFn({
      fn: (items) => {
        const columns = ['name', 'frameMaterieal', 'categoryName']

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

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    deleteProduct(id).then((data) => {
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: "error",
        });
      } else {
        NotifyMessage({
          message: "product deleted",
          type: "success",
        });
        setProducts(
          produce(products, (draft) => {
            const index = products.findIndex((product) => product.id === id);
            if (index !== -1) draft.splice(index, 1);
          })
        );
      }
    });
  }
       const [productImage, setProductImage] = useState([]);
      
  const openInPopup = (item) => {
     setProductImage(...item.ProductImages);
    setRecordForEdit({ ...item, editing: true })
    setOpenPopup(true)
  }
  const[product,setProduct]=useState()
  const[openProduct,setOPenProduct]=useState(false)
  const handleSale=(id)=>{
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
                  <TableRow key={item.id}>
                    <TableCell style={{ width: "5%" }}>{item.name}</TableCell>
                    <TableCell>{item.frameMaterieal}</TableCell>
                    <TableCell>{item.categoryName}</TableCell>
                    <TableCell style={{ width: "5%" }}>{item.price}
                    </TableCell>
                    <TableCell style={{ width: "5%" }}>
                      {item.quantity}
                    </TableCell>
                    {item.ProductImages.map((product) => (
                      <TableCell width={50}>
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
                        <EditIcon fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        title="Sale"
                        size="small"
                        onClick={() => {
                          handleSale(item);
                        }}
                      >
                        <ShoppingCartIcon fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        title="Delete"
                        size="small"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this product?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(item.id);
                            },
                          });
                        }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
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
          NotifyMessage={NotifyMessage}
          setOpenPopup={setOpenPopup}
          recordForEdit={recordForEdit}
          setProducts={setProducts}
          setLoading={setLoading}
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
