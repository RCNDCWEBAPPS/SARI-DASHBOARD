import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { makeStyles, AppBar } from "@material-ui/core";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SalesProductReport from "../Admin/ManagePoducts/salesProductReport";
import OnStockProduct from "../Admin/ManagePoducts/ProductReports";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
    position: "relative",
  },
  root: {
    marginLeft: "20px",
    backgroundColor: theme.palette.background.paper,
    width: "75%",
    marginRight: "20px",
  },
  Select: {
    position: "absolute",
    right: "10px",
    width: "150px",
  },
}));
export default function LabTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <TabList
                TabIndicatorProps={{ style: { background: "#203040" } }}
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  style={{ color: "#203040" }}
                  label="On Stock Products Report"
                  value="1"
                />
                <Tab
                  style={{ color: "#203040" }}
                  label="Sales Product Report"
                  value="2"
                />
              </TabList>
            </AppBar>
          </div>
        </Box>
        <TabPanel value="1">
          <OnStockProduct />
        </TabPanel>
        <TabPanel value="2">
          <SalesProductReport />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
