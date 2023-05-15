import React from "react";
import { Breadcrumbs, Link, Typography, makeStyles } from "@material-ui/core";
import NavLinkAdapter from "../../components/NavLinkAdapter/NavLinkAdapter";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 20
  },
  text:{
textTransform: 'capitalize'
  }
}));

const OftadehBreadcrumbs = props => {
  const { path } = props;
  const classes = useStyles();
  const pathName = path.location.pathname.split("/");
  console.log(pathName)
  const lastRoute = pathName.splice(-1, 1);

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
    
            <Link
              component={NavLinkAdapter}
              to={pathName.join("/")}
              activeClassName="active"
              exact={true}
              color="inherit"
            >
              Home
            </Link>
        
        <Typography className={classes.text} color="textPrimary">{lastRoute.toString()}</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default OftadehBreadcrumbs;
