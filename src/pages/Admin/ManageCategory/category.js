import React from 'react'
import ContentWrapper from '../../../components/ui/ContentWrapper'
import Norecords from '../../../components/ui/Norecords'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Grid, InputAdornment, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import useTable from '../../../components/ui/useTable'
import Notification from '../../../components/ui/Notification'
import ConfirmDialog from '../../../components/ui/ConfirmDialog'
import Notify from '../../../components/ui/Notify'
import Popup from '../../../components/ui/Popup'
import Controls from '../../../components/ui/controls/Controls'
import { Search, Add } from '@mui/icons-material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditIcon from '@mui/icons-material/Edit'
import produce from 'immer'
import PageSpinner from '../../../components/ui/PageSpinner'
import OftadehLayout from '../../../components/Layout/Layout'
import OftadehBreadcrumbs from '../../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
import { makeStyles, TextField } from '@material-ui/core'

import AdminRequest from '../../../components/request/Admin/categoryRequest'
import CategorieForm from '../../../components/forms/categoryForm'
import CategorieFrom from '../../../components/forms/categoryForm'

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
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'actions', label: 'Actions', disableSorting: true },
]
const Category = (props) => {
  const { history } = props
  const classes = useStyles()
  const [openPopup, setOpenPopup] = useState(false)
  const [Q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [recordForEdit, setRecordForEdit] = useState(null)
  const { NotifyMessage, notify, setNotify } = Notify()
  const { viewAllCategory,deleteCategory,} = AdminRequest()
  const [categories, setCategories] = useState([])
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
  const[singleRanch,setSingleRanch]=useState([]);
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(categories, headCells, filterFn);

  useEffect(() => {
    viewAllCategory().then((data) => {
console.log(data)
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else if (data.categorys) {
        setLoading(false)
        setCategories(data.categorys)
        
      }
    })
  }, [])


  useEffect(() => {
    setFilterFn({
      fn: (items) => {
        const columns = [
          'name',
          'description',
        ]

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
  
    deleteCategory(id).then((data) => {
      if (data.err) {
        NotifyMessage({
          message: data.err,
          type: 'error',
        })
      } else {
        NotifyMessage({
          message: "categorie deleted",
          type: 'success',
        })
        setCategories(
          produce(categories, (draft) => {
            const index = categories.findIndex(
              (categorie) => categorie.id === id,
            )
            if (index !== -1) draft.splice(index, 1)
          }),
        )
      }
    })
  }
  const openInPopup = (item) => {
    setRecordForEdit({ ...item, editing: true })
    setOpenPopup(true)
  }
  return (
    <OftadehLayout>
      <Typography className={classes.mb3} variant="h5" component="h1">
        Categories Mangement
      </Typography>
      <OftadehBreadcrumbs path={history} />
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Controls.Input
              label="Search categorie"
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
                setQ(e.target.value.trimLeft().toLowerCase())
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
                setOpenPopup(true)
                setRecordForEdit(null)
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
                recordsAfterPagingAndSorting().map((item,index) => (
             <TableRow >
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                                 
                    <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        title="Update"
                       size='small'
                        variant="contained"
                        onClick={() => {
                          openInPopup(item)
                        }}
                      >
                        <EditIcon fontSize="medium" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        title="Delete"
                        size='small'
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this Categorie?',
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(item.id)
                            },
                          })
                        }}
                      >
                        <DeleteOutlineIcon fontSize="medium" />
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
        title="Categorie Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CategorieFrom
          NotifyMessage={NotifyMessage}
          setOpenPopup={setOpenPopup}
          recordForEdit={recordForEdit}
          setCategories={setCategories}
        />
      </Popup>
    </OftadehLayout>
  )
}

export default Category
