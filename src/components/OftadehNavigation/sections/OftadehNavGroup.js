import React from "react";

import OftadehNavCollapse from "./OftadehNavCollapse";
import OftadehNavItem from "./OftadehNavItem";
import OftadehNavLink from "./OftadehNavLink";
import { ListSubheader } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 0,
    marginLeft:"40px"
    
  }
}));
const OftadehNavGroup = props => {
  const { item } = props;
const classes=useStyles();
  return (
    <div className={classes.root}>
      <ListSubheader>{item.title}</ListSubheader>

      {item.children && (
        <React.Fragment>
          {item.children.map(item => (
            <React.Fragment key={item.id}>
              {item.type === "group" && <NavGroup item={item} />}

              {item.type === "collapse" && <OftadehNavCollapse item={item} />}

              {item.type === "item" && <OftadehNavItem item={item} />}

              {item.type === "link" && <OftadehNavLink item={item} />}
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

const NavGroup = React.memo(OftadehNavGroup);

export default NavGroup;
