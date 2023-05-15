/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
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
import { loginSlice } from '../../../slice/login'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Logo from "../../../images/sarie.jpg";
import Collapse from '@mui/material/Collapse'
import { Divider, CircularProgress } from '@mui/material'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})
const useStyles = makeStyles(() => ({
  forgetPassword: {
    position: 'absolute',
    left: 200,
    top: 0,
    bottom: 200,
    transform: 'translate(-35%,-50%) !important',
  },
  paper: { maxWidth: '100px', position: 'absolute', left: 10, top: 10 },
  topScrollPaper: {
    alignItems: 'flex-start',
  },
  topPaperScrollBody: {
    verticalAlign: 'top',
  },
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
  button: {
    backgroundColor: '#203040',
    color: 'white',
    fontFamily: 'Times New Roman',
  },
}))
function Sign() {
    const[role,setRole]=React.useState('')
   React.useEffect(() => {
    if (localStorage.getItem('user_id') || localStorage.getItem('token')) {
    setRole(localStorage.getItem('role'))
    }
   },[])
  const dispatch = useDispatch()
  const loginActions = loginSlice.actions
  const { user_identifier, password } = useSelector(
    (state) => state.login.inputValues,
  )
  const { user_IdentifierErr, passwordErr } = useSelector(
    (state) => state.login.inputErrors,
  )
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const [openAlert, setOpenAlert] = React.useState(false)
  const [openAlertCon, setOpenAlertCon] = React.useState('')
  const [openAlerMess, setOpenAlertMess] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [forgetOpen, setForgetOpen] = React.useState(false)
  const handleForget = () => {
    setOpen(false)
    setForgetOpen(true)
  }
  const handleCloseForget = () => {
    setOpen(true)
    setForgetOpen(false)
  }
  const navgate = useHistory()
  const handleClose = () => {
    setOpen(false)
    navgate.push('/')
  }
  const md2 = useMediaQuery({ query: '(max-width: 577px)' })

  const validate = (e) => {
    e.preventDefault()
    // Resetting input errors to default
    dispatch(loginActions.setPasswordErr(''))
    dispatch(loginActions.setEmailErr(''))

    let isValid = true
    if (password.length < 6) {
      dispatch(
        loginActions.setPasswordErr('Password should be atleast 6 characters!'),
      )
      isValid = false
    }

    if (isValid) {
      requestLogin()
    }
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const requestLogin = () => {
    setLoading(true)
    console.log('vjn hvjgyt')
    axios
      .post(
        `${url}/signin`,
        {
          input: user_identifier,
          password: password,
        },
        config,
      )
      .then((response) => {
        console.log(response)
        console.log(user_identifier, password)
        if (response.data.message ==='user not found, register first prior to signIn!') {
          setLoading(false)
          setOpenAlert(true)
          setOpenAlertCon('error')
          setOpenAlertMess('user with this username is not found')
        }
        if (response.data.err === 'Password is incorrect') {
          setLoading(false)
          setOpenAlert(true)
          setOpenAlertCon('error')
          setOpenAlertMess('Password is incorrect')
        } else if (response.data.user) {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user_id', response.data.user.id)
          localStorage.setItem('loginInfo', JSON.stringify(response.data.user))
          localStorage.setItem('userInfo', JSON.stringify(response.data))
          localStorage.setItem('role', response.data.user.role)
          dispatch(loginActions.setIsUserLogged(true))
          dispatch(loginActions.setLoggedUser(response.data))
          dispatch(loginActions.setUserInformation(response.data))
          if (response.data.user.role === 'sales') {
            navgate.push(`/salesDashboard`)
          }
        }
      })
  }
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => {
    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const handleSignUp = () => {
    navgate.push('/signup')
  }
  const [emaileInput, setEmailInput] = React.useState('')
  const sendEmaile = () => {
    axios
      .post(
        `${url}admin-forgotPassword`,
        {
          input: emaileInput,
        },
        config,
      )
      .then((response) => {
        console.log(response)
      })
  }
  console.log(openAlerMess)
  return (
    <div>
{role==='sales'?(
  navgate.push('/salesProduct')
):(
   <div className="h-screen bg-gray-200 flex justify-center items-center">
      <Card className="max-w-md" style={{ height: "80%" }}>
        <div className="flex justify-center align-center">
          <img
            src={Logo}
            style={{ marginTop: "20px", maxHeight: "50%", maxWidth: "20%" }}
            className={classes.image}
          />
        </div>
        <CardContent>
          <div className="mb-8 ">
            <Typography variant="h5" style={{ color: "#203040" }}>
              Login
            </Typography>
            Signin to your account
          </div>
          <Collapse in={openAlert}>
            <Alert
              severity={openAlertCon}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
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
          <form onSubmit={validate}>
            <TextField
              InputLabelProps={{
                style: { color: "#203040" },
              }}
              fullWidth
              className={classes.borderTextField}
              label="Email or UserName"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon style={{ color: "#203040" }} color="primary" />
                  </InputAdornment>
                ),
              }}
              value={user_identifier}
              onChange={(e) => {
                dispatch(loginActions.setUser_Identifier(e.target.value));
              }}
              helperText={user_IdentifierErr}
            />
            <TextField
              fullWidth
              className={classes.borderTextField}
              style={{ marginTop: "20px" }}
              required
              id="outlined-required"
              label="Password"
              InputLabelProps={{
                style: { color: "#203040" },
              }}
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon style={{ color: "#203040" }}></LockIcon>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              value={password}
              onChange={(e) => {
                dispatch(loginActions.setPassword(e.target.value));
              }}
              helperText={passwordErr}
            />
            <CardActions style={{ marginTop: "20px" }}>
              <Button
                type="submit"
                style={{ backgroundColor: "#203040", color: "white" }}
              >
                Login
              </Button>
             
            </CardActions>
            <div>
              {loading && (
                <CircularProgress
                  size="15px"
                  color="inherit"
                  className={classes.logging}
                />
              )}
            </div>
          </form>
        </CardContent>
      </Card>
     
    </div>

    )}
    </div>
  )
}
export default Sign
