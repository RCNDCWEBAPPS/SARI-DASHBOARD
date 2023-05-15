import React, { useState,useEffect } from "react";


import {
  AppBar,
  Box,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";

import DailyReports from "../../reports/DailyReports";
import WeeklyReports from "../../reports/WeeklyReport";
import MonthlyReports from "../../reports/monthlyReports";
import YearlyReports from "../../reports/yearlyReports";
import AdminRequest from "../../../components/request/Admin/productRequest";
import PageSpinner from "../../../components/ui/PageSpinner";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    padding: theme.spacing(3),
    position: "relative",
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "75%",
  },
  Select: {
    position: "absolute",
    right: "10px",
    width: "150px",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} paddingLeft={0} paddingRight={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductsReports = (props) => {

  const classes = useStyles();
  const { viewAllProduct } = AdminRequest();
const[products,setProducts]=useState([])
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const[loading,setLoading]=useState(true)
  useEffect(() => {
    viewAllProduct().then((data) => {
      console.log(data);
      if (data.err) {
      
      } else if (data.products) {
        console.log(data.products);
        setLoading(false);
        setProducts(data.products);
      }
    });
  }, []);
  return (
        <div>

          <div>
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Daily" {...a11yProps(0)} />
                  <Tab label="Weekly" {...a11yProps(1)} />
                  <Tab label="Monthly" {...a11yProps(2)} />
                  <Tab label="Yearly" {...a11yProps(3)} />
                </Tabs>
              </AppBar>
            </div>
            {loading ? (
              <PageSpinner />
            ) : (
              <>
                {" "}
                <TabPanel value={value} index={0}>
                  <DailyReports report={products} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <WeeklyReports report={products} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <MonthlyReports report={products} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <YearlyReports report={products} />
                </TabPanel>
              </>
            )}
          </div>
          </div>
   
  );
};
function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{`${label}:00 - ${label}:59`}</h4>
        <p>{payload && payload[0].value} Bookings</p>
      </div>
    );
  }
  return null;
}
export default ProductsReports;
