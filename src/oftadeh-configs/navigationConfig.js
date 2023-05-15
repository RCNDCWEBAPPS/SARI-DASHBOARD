// import { MaterialUIComponentsNavigation } from "../pages/documentation/material-ui-components/MaterialUIComponentsNavigation";
import PersonIcon from '@mui/icons-material/Person';
import React from 'react'
import AgricultureIcon from '@mui/icons-material/Agriculture';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
const navigationConfig = [
  {
    id: "Main",

    type: "group",
    children: [
      {
        id: "dashboard",
        title: "Dashboard",
        type: "item",
        icon: <FormatAlignLeftIcon />,
        url: "/",
        exact: true,
      },

      {
        id: "sales",
        title: "Manage Sales",
        type: "item",
        icon: <FormatAlignLeftIcon />,
        url: "/Sales",
        exact: true,
      },
      {
        id: "main products",
        title: "Manage Products",
        type: "item",
        icon: <FormatAlignLeftIcon />,
            url: "/products",
            exact: true,
          },

      {
        id: "categorie",
        title: "Manage Categories",
        type: "item",
        icon: <FormatAlignLeftIcon />,
        url: "/categorie",
        exact: true,
      },
    ],
  },
  {
    id: "divider-1",
    type: "divider",
  },
];

export default navigationConfig;
 