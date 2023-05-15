import Controls from '../ui/controls/Controls'
import React from 'react'
import { Form, useForm } from '../ui/useForm'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import AdminRequest from "../request/Admin/adminRequest"
import produce from 'immer'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const initialFValues = {
  firstName: '',
  lastName: '',
  email: '',
  sex: '',
  password: '',
  ranch: null,
  username: '',
  check:false,
  phoneNo: '',
  editing: false,
  role: 'sales', 
}
const SalesForm = ({
  NotifyMessage,
  setOpenPopup,
  recordForEdit,
  setSales,
}) => {

  const {addSales, updateSales, } = AdminRequest()
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
    if ('firstName' in fieldValues)
      temp.firstName =
        fieldValues.firstName.length !== 0 ? '' : 'This field is required.'

    if ('lastName' in fieldValues)
      temp.lastName =
        fieldValues.lastName.length !== 0 ? '' : 'This field is required.'
    if ('email' in fieldValues)
      temp.email =
        regexEmail.test(fieldValues.email.toString().toLowerCase()) &&
        fieldValues.email.length !== 0
          ? ''
          : 'Email is not valid.'
    if ('phoneNo' in fieldValues)
      temp.phoneNo = 
        fieldValues.phoneNo.length !== 0 ? '' : 'This field is required.'
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
  const [checked, setChecked] = React.useState(false);
  const handleChange = (event) => {
setChecked(event.target.checked)
if(event.target.checked){
  values.check=true
}
else{
values.check=false
}
  };
  console.log(values.check)
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      setValues({ ...values, submitting: true })
      if (values.editing === false) {
        addSales(values).then((data) => {
          console.log(data)
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            setSales(
              produce((draft) => {
                draft.unshift({ ...data.user})
              }),
            )
            NotifyMessage({
              message: 'Sales created.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
          }
        })
      } else {
        console.log(recordForEdit)
        updateSales(values, recordForEdit.id).then((data) => {
          if (data.err) {
            setValues({ ...values, submitting: false })
            NotifyMessage({
              message: data.err,
              type: 'error',
            })
          } else {
            console.log(data)
            NotifyMessage({
              message: 'Sales updated.',
              type: 'success',
            })
            setOpenPopup(false)
            resetForm()
            setSales(
              produce((draft) => {
                const index = draft.findIndex(
                  (sales) => sales.id === recordForEdit.id,
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
            label="First Name"
            name="firstName"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Last Name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Phone Number"
            name="phoneNo"
            value={values.phoneNo}
            onChange={handleInputChange}
            error={errors.phoneNo}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Username"
            name="username"
            value={values.username}
            onChange={handleInputChange}
            error={errors.username}
            disabled={!values.editing}
          />
        </Grid>
        {values.editing ? (
          <Grid container item xs={12} md={6} spacing={2}>
            <Grid item xs={8} md={8}>
              <Controls.Input
                label="Password"
                name="password"
                disabled
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4} md={4}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleChange} />
                  }
                  label="Change Password"
                />
              </FormGroup>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} md={6}>
            <Controls.Input
              label="Password"
              name="password"
              value={values.username}
              onChange={handleInputChange}
              error={errors.username}
              disabled={!values.editing}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Controls.Button
            color="primary"
            variant="outlined"
            disabled={values.submitting ? true : false}
            text={
              values.editing === true
                ? values.submitting
                  ? "Editing..."
                  : "Edit"
                : values.submitting
                ? "Adding..."
                : "Add"
            }
            className="Button"
            type="submit"
          />
        </Grid>
      </Grid>
    </Form>
  );
}
export default SalesForm
