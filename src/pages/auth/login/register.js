/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useTheme } from '@mui/material/styles'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
//import Logo from './RCNDC.png'
import { useHistory } from 'react-router'
import TextField from '@mui/material/TextField'
import Slide from '@mui/material/Slide'
import { useMediaQuery } from 'react-responsive'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import InputAdornment from '@mui/material/InputAdornment'
import axios from 'axios'
import { url } from '../../../utiles/config'
import { Typography } from '@material-ui/core'
import { Close, Phone } from '@material-ui/icons'
import { Divider, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import { useDispatch, useSelector } from 'react-redux'
import { registerSlice } from '../../../slice/register'
import Stack from '@mui/material/Stack'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})
const useStyles = makeStyles(() => ({
  borderTextField: {
    // - The TextField-root
    // - Make the border more distinguishable

    // (Note: space or no space after & matters. See SASS "parent selector".)
    '& .MuiOutlinedInput-root': {
      // - The Input-root, inside the TextField-root
      '& fieldset': {
        // - The <fieldset> inside the Input-root
        borderColor: '#203040',

        // - Set the Input border
      },
      '&:hover fieldset': {
        borderColor: '#203040',

        // - Set the Input border when parent has :hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#203040',
        label: {
          display: 'none',
        }, // - Set the Input border when parent is focused
      },
    },
  },
  logging: {
    marginRight: '20px',
  },
}))
function Register() {
  const dispatch = useDispatch()
  const registerAction = registerSlice.actions

  const {
    FirstName,
    MiddleName,
    LastName,
    email,
    phone,
    sex,
    password1,
    password2,
    username,
  } = useSelector((state) => state.register.inputValues)
  const {
    firstNameErr,
    middleNameErr,
    lastNameErr,
    emailErr,
    phoneErr,
    addressErr,
    password1Err,
    password2Err,
    sexErr,
    userNameErr,
    BirthDateErr,
  } = useSelector((state) => state.register.inputErrors)
  const [open, setOpen] = React.useState(true)
  const [openAlert, setOpenAlert] = React.useState(false)
  const [openAlertCon, setOpenAlertCon] = React.useState('')
  const [openAlerMess, setOpenAlertMess] = React.useState('')
  const validate = (e) => {
    e.preventDefault()
    dispatch(registerAction.setFirstNameErr(''))
    dispatch(registerAction.setMiddleNameErr(''))
    dispatch(registerAction.setLastNameErr(''))
    dispatch(registerAction.setEmailErr(''))
    dispatch(registerAction.setPhoneErr(''))
    dispatch(registerAction.setPassword1Err(''))
    dispatch(registerAction.setPassword2Err(''))
    dispatch(registerAction.setUserNameErr(''))

    let isValid = true
    if (FirstName.length < 2) {
      dispatch(
        registerAction.setFirstNameErr(
          'first name must be at leas two character',
        ),
      )
      isValid = false
    }
    if (MiddleName.length < 2) {
      dispatch(
        registerAction.setMiddleNameErr(
          'middle name name must be at leas two character',
        ),
      )
      isValid = false
    }
    if (LastName.length < 2) {
      dispatch(
        registerAction.setLastNameErr(
          'last name must be at leas two character',
        ),
      )
      isValid = false
    }
    if (phone.replaceAll(' ', '').length !== 13) {
      dispatch(registerAction.setPhoneErr('Invalid phone number'))
      isValid = false
    }
    /*	if (phone.replaceAll(' ', ' ').length !== 13) {
		  dispatch(registerAction.setPhoneErr(' Invalid phone number'));
		  isValid = false;
		}*/
    if (username.length < 2) {
      dispatch(
        registerAction.setUserNameErr(
          'user name must be atleast twov characeter',
        ),
      )
    }
    if (password1 !== password2) {
      dispatch(registerAction.setPassword2Err('password must be much'))
      isValid = false
    } else if (password1.length < 6) {
      dispatch(
        registerAction.setPassword1Err('password must be atleast 6 character'),
      )
      isValid = false
    }
    if (isValid) {
      sendRequest()
    }
  }
const history=useHistory()
  const classes = useStyles()
  const [loading, setLoading] = React.useState(false)
  const sendRequest = () => {
    setLoading(true)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    axios
      .post(
        `${url}/admin-signup`,
        {
          firstName: FirstName,
          middleName: MiddleName,
          lastName: LastName,
          phoneNo: phone,
          email: email,
          username: username,
          password: password1,
          sex: sex,
        },
        config,
      )
      .then((response) => {
        setLoading(false)
        console.log(response.data.message)
        if (response.data.message ==='user already exists!') {
          setOpenAlert(true)
          setOpenAlertCon('warning')
          setOpenAlertMess('some one is already register in this account')
        }
      else  if (response.data.message ==='admin account registered successfully!') {
          history.push('/adminLogin')
          setOpenAlert(true)
          setOpenAlertMess('You Are Registered Successfully')
          		dispatch(registerAction.setRegistrationSuccessful(true));
          setOpenAlertCon('success')
          dispatch(registerAction.setFirstName(''))
          dispatch(registerAction.setMiddleName(''))
          dispatch(registerAction.setLastName(''))
          dispatch(registerAction.setPhone(''))
          dispatch(registerAction.setEmail(''))
          dispatch(registerAction.setMiddleName(''))
          dispatch(registerAction.setPassword2(''))
          dispatch(registerAction.setPassword1(''))
          dispatch(registerAction.setUserName(''))
          dispatch(registerAction.setSex(''))
        }
      })
      .catch(function (error) {
        setLoading(false)
        setOpenAlert(true)
        setOpenAlertCon('error')
        setOpenAlertMess('Something Is Error')
      })
  }
  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          style={{ marginLeft: '10px', marginTop: '30px' }}
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '30ch' },
          }}
          autoComplete="off"
        >
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Collapse in={openAlert}>
              <Alert
                severity={openAlertCon}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenAlert(false)
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {openAlerMess}
              </Alert>
            </Collapse>
          </Stack>
          <Typography className={classes.mb3} variant="h5" component="h1">
            User Form
          </Typography>
          <Divider sx={{ fontSize: '32px', width: '50px' }} />
          <TextField
            id="outlined-basic"
            className={classes.borderTextField}
            InputLabelProps={{
              style: { color: '#203040' },
            }}
            label="FirstName"
            value={FirstName}
            onChange={(e) => {
              dispatch(registerAction.setFirstName(e.target.value))
            }}
            variant="outlined"
            style={{ width: '45%' }}
            helperText={firstNameErr}
          />

          <TextField
            helperText={middleNameErr}
            style={{ width: '45%' }}
            id="filled-basic"
            className={classes.borderTextField}
            InputLabelProps={{
              style: { color: '#203040' },
            }}
            label="MiddleName"
            variant="outlined"
            value={MiddleName}
            onChange={(e) => {
              dispatch(registerAction.setMiddleName(e.target.value))
            }}
          />
          <TextField
            helperText={lastNameErr}
            style={{ width: '45%' }}
            id="filled-basic"
            className={classes.borderTextField}
            InputLabelProps={{
              style: { color: '#203040' },
            }}
            label="LastName"
            variant="outlined"
            value={LastName}
            onChange={(e) => {
              dispatch(registerAction.setLastName(e.target.value))
            }}
          />
          <TextField
            helperText={emailErr}
            style={{ width: '45%' }}
            id="filled-basic"
            className={classes.borderTextField}
            InputLabelProps={{
              style: { color: '#203040' },
            }}
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              dispatch(registerAction.setEmail(e.target.value))
            }}
          />
          <TextField
            helperText={userNameErr}
            style={{ width: '45%' }}
            id="filled-basic"
            className={classes.borderTextField}
            InputLabelProps={{
              style: { color: '#203040' },
            }}
            label="UserName"
            variant="outlined"
            value={username}
            onChange={(e) => {
              dispatch(registerAction.setUserName(e.target.value))
            }}
          />
          <TextField
            helperText={phoneErr}
            style={{ width: '45%' }}
            id="standard-basic"
            className={classes.borderTextField}
            InputLabelProps={{
              style: { color: '#203040' },
            }}
            label="phone"
            variant="outlined"
            value={phone}
            onChange={(e) => {
              dispatch(registerAction.setPhone(e.target.value))
            }}
          />
          <TextField
            helperText={password1Err}
            id="standard-basic"
            style={{ width: '45%' }}
            className={classes.borderTextField}
            InputLabelProps={{
              style: { color: '#203040' },
            }}
            label="Password"
            variant="outlined"
            value={password1}
            onChange={(e) => {
              dispatch(registerAction.setPassword1(e.target.value))
            }}
          />
          <TextField
            helperText={password2Err}
            id="standard-basic"
            style={{ width: '45%' }}
            className={classes.borderTextField}
            InputLabelProps={{
              style: { color: '#203040' },
            }}
            label="Confirm Password"
            variant="outlined"
            value={password2}
            onChange={(e) => {
              dispatch(registerAction.setPassword2(e.target.value))
            }}
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              // eslint-disable-next-line react/jsx-no-duplicate-props
       
              value={sex}
              onChange={(e) => {
                dispatch(registerAction.setSex(e.target.value))
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        </Box>
        <div style={{ display: 'flex' }}>
          <Button
            onClick={(event) => validate(event)}
            style={{
              backgroundColor: '#203040',
              width: '70px',
              marginLeft: '20px',
              marginBottom: '30px',
              marginTop: '30px',
              color: 'white',
            }}
          >
            SignUp
          </Button>
          {loading && (
            <CircularProgress
              size="15px"
              color="inherit"
              className={classes.logging}
            />
          )}
          <div style={{ marginTop: '40px', marginLeft: '10px' }}>
            Is Already Signup{' '}
            <Link
              to="/adminLogin"
              style={{ marginLeft: '10px', textDecoration: 'none' }}
            >
              SignIn
            </Link>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Register
