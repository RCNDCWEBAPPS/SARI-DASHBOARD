
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
import { loginSlice } from '../../../slice/login'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import { Divider, CircularProgress } from '@mui/material'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})
function ForgetPassword() {
  return (
    <div>forgetPassword</div>
  )
}

export default ForgetPassword