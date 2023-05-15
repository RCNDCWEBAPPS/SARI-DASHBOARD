import React from 'react'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import navigationConfig from '../../oftadeh-configs/navigationConfig'
import { ToastContainer, toast } from 'react-toastify'
import suplayNavigationConfig from '../../oftadeh-configs/salesNavigationConfog'
import Logo from '../../images/sarie.jpg'
import OftadehNavGroup from './sections/OftadehNavGroup'
import OftadehNavCollapse from './sections/OftadehNavCollapse'
import OftadehNavItem from './sections/OftadehNavItem'
import OftadehNavLink from './sections/OftadehNavLink'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import inpectorNaviegationConfig from '../../oftadeh-configs/inspectorNavigationCOnfig'
const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,

  logoBg: {
    //   backgroundColor: theme.palette.type !== "#203040",
    backgroundColor: '#203040',
  },
  button:{
        backgroundColor: '#203040',
  },
  logo: {
    padding: '1rem',
    '& span': {
      display: 'block',
      //color: 'rgba(41, 113, 245, 0.87)',
    },
  },
  navCustom: {
    '& .MuiTypography-root': {
      fontSize: '.95rem',
      marginLeft:"10px"
    },
    '& .MuiListItemIcon-root': {
      minWidth: '35px',
    },
    '& .MuiCollapse-wrapperInner a': {
      paddingLeft: '50px',
    },
  },
}))

const OftadehNavigation = (props) => {
  let user
  const history = useHistory()
  const classes = useStyles(props)
  const [username, setUsername] = React.useState("");
  React.useEffect(() => {
    if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
      console.log('no token')
      history.push('/adminLogin')
    } else {
      // eslint-disable-next-line react-hooks/exhaustive-deps
    setUsername(localStorage.getItem('role'))
   
    }
  }, [])
   // console.log(user)
  return (
    <div>
      {!localStorage.getItem('user_id') || !localStorage.getItem('token') ? (
        (history.push('/adminLogin'),
        toast.info('Log to  creat livestream! ', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }))
      ) : (
        <div>
          <div className={clsx(classes.toolbar, classes.logoBg)}>
             <Link
                      to="/"
                      style={{  textDecoration: "none" }}
                    >
            <img
              src={Logo}
              alt="logo"
              style={{
              marginTop:'20px',
                marginLeft: '85px',
                height: '70px',
              }}
            ></img>
            </Link>
             <Typography
              className={classes.logo}
              variant="h6"
              component="h1"
              align="center"
            >
              <span style={{ color: 'white', marginRight:"20px" }}> SARI INVENTORY</span>
            </Typography>
          </div>
          <Divider />
          <List className={classes.navCustom}>
            {
              username==='inspector'?
              <div>
                {inpectorNaviegationConfig.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.type === 'group' && <OftadehNavGroup item={item} />}

                    {item.type === 'collapse' && (
                      <OftadehNavCollapse item={item} />
                    )}

                    {item.type === 'item' && <OftadehNavItem item={item} />}

                    {item.type === 'link' && <OftadehNavLink item={item} />}

                    {item.type === 'divider' && <Divider className="my-16" />}
                  </React.Fragment>
                ))}
              </div>:
              <div>

            {username === 'admin' ? (
              <div>
                {navigationConfig.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.type === 'group' && <OftadehNavGroup item={item} />}

                    {item.type === 'collapse' && (
                      <OftadehNavCollapse item={item} />
                    )}

                    {item.type === 'item' && <OftadehNavItem item={item} />}

                    {item.type === 'link' && <OftadehNavLink item={item} />}

                    {item.type === 'divider' && <Divider className="my-16" />}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div>
                {suplayNavigationConfig.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.type === 'group' && <OftadehNavGroup item={item} />}

                    {item.type === 'collapse' && (
                      <OftadehNavCollapse item={item} />
                    )}

                    {item.type === 'item' && <OftadehNavItem item={item} />}

                    {item.type === 'link' && <OftadehNavLink item={item} />}

                    {item.type === 'divider' && <Divider className="my-16" />}
                  </React.Fragment>
                ))}
              </div>
            )}
              </div>
            }

          </List>
        </div>
      )}
    </div>
  )
}

export default OftadehNavigation
