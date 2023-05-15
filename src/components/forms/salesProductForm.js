import Controls from '../ui/controls/Controls'
import React from 'react'
import { Form, useForm } from '../ui/useForm'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import SalesRequest from "../request/salesRequest"
import produce from 'immer'
const initialFValues = {
name: '',
frameMaterieal: '',
categoryName: '',
size: '',
price:"",
quantity:"",
modelNo:"",
 editing: false,
}
const ProductForm = ({
  NotifyMessage,
  setOpenPopup,
  recordForEdit,
  setProducts,
}) => {

  const {addProduct, updateSales, } = SalesRequest()
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

    if ('frameMaterieal' in fieldValues)
      temp.frameMaterieal =
        fieldValues.frameMaterieal.length !== 0 ? '' : 'This field is required.'
    if ('modelNo' in fieldValues)
      temp.modelNo = 
        fieldValues.modelNo.length !== 0 ? '' : 'This field is required.'
      if ('price' in fieldValues)
      temp.price = 
        fieldValues.price.length !== 0 ? '' : 'This field is required.'
    
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
        addProduct(values).then((data) => {
          console.log(data)
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            setProducts(
              produce((draft) => {
                draft.unshift({ ...data.products})
              }),
            )
            NotifyMessage({
              message: 'Product created.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
          }
        })
      } else {
        updateSales(values, recordForEdit.id).then((data) => {
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            NotifyMessage({
              message: 'Product updated.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
            setProducts(
              produce((draft) => {
                const index = draft.findIndex(
                  (sales) => sales.username === recordForEdit.username,
                )
                if (index !== -1) draft[index] = data.user
              }),
            )
          }
        })
      }
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Controls.Input
            fullWidth
            label="Product Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Frame Materieal"
            name="frameMaterieal"
            value={values.frameMaterieal}
            onChange={handleInputChange}
            error={errors.frameMaterieal}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Size"
            name="size"
            value={values.size}
            onChange={handleInputChange}
            error={errors.size}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Price"
            name="price"
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Quantity"
            name="quantity"
            value={values.quantity}
            onChange={handleInputChange}
            error={errors.quantity}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Model"
            name="modelNo"
            value={values.modelNo}
            onChange={handleInputChange}
            error={errors.modelNo}
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
export default ProductForm
