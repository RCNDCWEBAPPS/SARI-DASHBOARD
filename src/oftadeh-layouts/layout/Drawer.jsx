import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { useMediaQuery } from 'react-responsive'
import OftadehNavigation from "../../components/OftadehNavigation/OftadehNavigation";
import NavigationContext from "../../context/NavigationContext";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: (props) => props.drawerWidth,
    flexShrink: 0,
  
  },
  drawerPaper: {
    width: (props) => props.drawerWidth,
    "& *": {
      color: "rgba(255, 255, 255, 0.7)",
      
    },
  },
}));

const OftadehDrawer = (props) => {
  const classes = useStyles(props);
  const { open,setOpen} = React.useContext(NavigationContext);
  const md2 = useMediaQuery({ query: '(max-width: 577px)' })
const handleClose=()=>{
  setOpen(false)
}
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      onClose={handleClose}
        PaperProps={{
    sx: { width: "95%" },
  }}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {md2&&
      <div style={{backgroundColor:'#203040'}}>
            <CloseIcon onClick={handleClose} style={{marginLeft:"250px",marginTop:"20px"}}/>
          </div>
}
      <OftadehNavigation />
    </Drawer>
  );
};

export default OftadehDrawer;
