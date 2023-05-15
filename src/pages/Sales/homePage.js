import React from 'react'
import { useEffect,useState } from 'react'
import TextField from '@mui/material/TextField'
import { Grid, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import { Form } from '../../components/ui/useForm'
import { makeStyles } from '@material-ui/core/styles'
import OftadehLayout from '../../components/Layout/Layout'
import OftadehBreadcrumbs from '../../components/OftadehBreadcrumbs/OftadehBreadcrumbs'
const DisabledTextField = withStyles({
  root: {
    marginRight: 8,
    '& .MuiInputBase-root.Mui-disabled': {
      color: 'black',
    },
  },
})(TextField)
const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
    overflow: 'hidden',
  },
}))
function HomePage(props) {
  const { history } = props
  const classes = useStyles()
  const[user,setUser]=useState('')
  const[userData,setUserData]=useState('')
  useEffect(() => {
setUser(JSON.parse(localStorage.getItem('loginInfo')))
},[])

console.log(user)
  return (
    <div>
      <OftadehLayout>
        <Typography className={classes.mb3} variant="h5" component="h1">
        
        </Typography>
        <OftadehBreadcrumbs path={history} />
        <Typography variant="h2">Welcome,{user.firstName} </Typography>
        <Form style={{ marginTop: '10px' }}>
          <Grid container className="border" spacing={2}>
            <Grid item xs={12} md={4}>
              <DisabledTextField
                label="First Name"
                disabled
                value={user.firstName}
                variant="outlined"
              />
            </Grid>
        
            <Grid item xs={12} md={4}>
              <DisabledTextField
                label="Last Name"
                disabled
                value={user.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DisabledTextField
                label="User Name"
                disabled
                value={user.username}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DisabledTextField
                label="Phone Number"
                disabled
                value={user.phoneNo}
                variant="outlined"
              />
            </Grid>
          
          </Grid>
        </Form>
      </OftadehLayout>
    </div>
  )
}

export default HomePage
