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
        id: "home",
        title: "Home",
        type: "item",
        url: "/salesDashboard",
        icon: <FormatAlignLeftIcon/>,
      },
      {
        id: "products",
        title: "Manage Products",
        type: "item",
           url: "/salesProduct",
        icon: <FormatAlignLeftIcon/>,
      },
            {
        id: "salescategorie",
        title: "Manage Categories",
        type: "item",
           url: "/salesCategorie",
        icon: <FormatAlignLeftIcon/>,
      },
    ],
  },
  {
    id: "divider-1",
    type: "divider",
  },
];

export default navigationConfig;
