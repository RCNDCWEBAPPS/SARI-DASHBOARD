import Controls from '../ui/controls/Controls'
import React from 'react'
import { Form, useForm } from '../ui/useForm'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import AdminRequest from "../request/Admin/categoryRequest"
import SalesRequest from '../request/salesRequest'
import produce from 'immer'
const initialFValues = {
 name:'',
description:'',
  editing: false,
  
}
const CategorieFrom = ({
  NotifyMessage,
  setOpenPopup,
  recordForEdit,
  setCategories,
  role
}) => {

  const {  addCategory, updateCategory, } = AdminRequest()
  const { salesAddCategory, salesUpdateCategory}=SalesRequest();
  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit,
      })
    }
  }, [recordForEdit])
  const validate = (fieldValues = values) => {
    const temp = { ...errors }
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    if ('name' in fieldValues)
      temp.name =
        fieldValues.name.length !== 0 ? '' : 'This field is required.'

    if ('description' in fieldValues)
      temp.description =
        fieldValues.description.length !== 0 ? '' : 'This field is required.'
    setErrors({
      ...temp,
    })

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '')
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate)
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      setValues({ ...values, submitting: true })
      if (values.editing === false) {
        if(role==='sales'){
           salesAddCategory(values).then((data) => {
          console.log(data)
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            setCategories(
              produce((draft) => {
                draft.unshift({ ...data.category})
              }),
            )
            NotifyMessage({
              message: 'Categorie Created.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
          }
        })
        }
        else{
        addCategory(values).then((data) => {
          console.log(data)
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            setCategories(
              produce((draft) => {
                draft.unshift({ ...data.category})
              }),
            )
            NotifyMessage({
              message: 'Categorie Created.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
          }
        })
      }
      } else {
       if(role==='sales'){
        salesUpdateCategory(values, recordForEdit.id).then((data) => {
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            console.log(data)
            NotifyMessage({
              message: 'Categorie updated.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
            setCategories(
              produce((draft) => {
                const index = draft.findIndex(
                  (categorie) => categorie.id === recordForEdit.id,
                )
                if (index !== -1) draft[index] = data.categorie
              }),
            )
          }
        })
       }
else{
        updateCategory(values, recordForEdit.id).then((data) => {
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            console.log(data)
            NotifyMessage({
              message: 'Categorie updated.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
            setCategories(
              produce((draft) => {
                const index = draft.findIndex(
                  (categorie) => categorie.id === recordForEdit.id,
                )
                if (index !== -1) draft[index] = data.categorie
              }),
            )
          }
        })
      }
      }
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Controls.Input
            fullWidth
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
          />
        </Grid>
        <Grid item xs={12}>
          <Controls.Button
            color="primary"
            variant="outlined"
            disabled={values.submitting ? true : false}
            text={
              values.editing === true
                ? values.submitting
                  ? 'Editing...'
                  : 'Edit'
                : values.submitting
                ? 'Adding...'
                : 'Add'
            }
            className="Button"
            type="submit"
          />
        </Grid>
      </Grid>
    </Form>
  )
}
export default CategorieFrom
