// import { MaterialUIComponentsNavigation } from "../pages/documentation/material-ui-components/MaterialUIComponentsNavigation";
import PersonIcon from '@mui/icons-material/Person';
import React from 'react'
import AgricultureIcon from '@mui/icons-material/Agriculture';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
const navigationConfig = [
  {
    id: "Main",
    title: "MAIN",
    type: "group",
    children: [
      {
        id: " ranch",
        title: "View Ranch",
        type: "collapse",
        icon: <FormatAlignLeftIcon/>,
       
        children: [
          {
            id: "all ranch",
            title: "View All Ranch",
            type: "item",
            url: "/allranch",
            exact: true,
          },
          {
            id: " one ranch",
            title: "One Ranch",
            type: "item",
            url: "/oneranch",
            exact: true,
          },
        ],
      },
      {
        id: "all Vaccien",
        title: "View All Vaccien",
        type: "item",
        icon:<FormatAlignLeftIcon/>,
        url: "/allVaccien",
        exact: true,
      },
          {
        id: "medicine",
        title: "View All Medicine",
        type: "item",
        icon: <FormatAlignLeftIcon/>,
        url: "/allmedicine",
        exact: true,
      },
         {
        id: "all protien",
        title: "View All Protien",
        type: "item",
        icon:<FormatAlignLeftIcon/>,
        url: "/allProtien",
        exact: true,
      },
   {
        id: "all liveStock",
        title: "View Total LiveStock",
        type: "item",
        icon:<FormatAlignLeftIcon/>,
        url: "/allLiveStock",
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
