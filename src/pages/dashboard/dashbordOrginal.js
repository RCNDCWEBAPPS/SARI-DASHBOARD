import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import OftadehLayout from "../../components/Layout/Layout";
import PageSpinner from "../../components/ui/PageSpinner";
import { Paper, Grid, makeStyles, Typography } from "@material-ui/core";
import OftadehBreadcrumbs from "../../components/OftadehBreadcrumbs/OftadehBreadcrumbs";
import OftadehChart from "../../components/OftadehChart/OftadehChart";
import OftadehBarChart from "../../components/OftadehChart/OftadehBarChart";
import OftadehPieChart from "../../components/OftadehChart/OftadehPieChart";
import SimpleTable from "./components/SimpleTable";
import clsx from "clsx";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AdminRequest from "../../components/request/Admin/productRequest";
import AdminRequestSales from "../../components/request/Admin/adminRequest";
import AdminRequestCategory from "../../components/request/Admin/categoryRequest";
import ButtonBase from "@material-ui/core/ButtonBase";
import Popup from "../../components/ui/Popup";
import ViewSaleProduct from "./viewSaleProduct";
import ViewRemaningProduct from "./viewRemaningProduct";
import SalesReport from "../Admin/ManagePoducts/salesProductReport";
import Reports from "./report";
import { Link } from "react-router-dom";
const useStyles = makeStyles((them) => ({
  card: {
    width: 150,
    height: 150,
    backgroundColor: "green",
  },
  cardContent: {
    fontSize: 20,
    backgroundColor: "green",
    height: 250,
    color: "white",
  },
}));
function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function JustifyContent(props) {
  const [openPopup, setOpenPopup] = React.useState(false);
  const [opetLeftProduct, setOpenLeftProducts] = React.useState(false);
  const [loading, setLoding] = React.useState(false);
  const [sales, setSales] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [categorie, setCategorie] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [salesProduct, setSalesProduct] = React.useState("");
  const [remaningProducts, setRemaningProduct] = React.useState("");
  const { viewAllProduct, viewSaleProduct, viewRemaningProduct } =
    AdminRequest();
  const { viewAllCategory } = AdminRequestCategory();
  const { viewAllSales } = AdminRequestSales();
  const { history } = props;
  const classes = useStyles();
  const [removeProducts, setRremoveProduct] = React.useState([]);
  const [leftProducts, setLeftProducts] = React.useState([]);
  React.useEffect(() => {
    setUsername(localStorage.getItem("role"));
    if (!localStorage.getItem("user_id") || !localStorage.getItem("token")) {
      console.log("no token");
      props.history.push("/adminLogin");
    } else {
      viewAllProduct().then((data) => {
        console.log(data);
        if (data.err) {
        } else if (data.products) {
          console.log(data.products);
          setLoding(false);
          setProducts(data.products);
        }
      });
      viewAllCategory().then((data) => {
        console.log(data);
        if (data.err) {
        } else if (data.categorys) {
          setLoding(false);
          setCategorie(data.categorys);
        }
      });
      viewAllSales().then((data) => {
        if (data.err) {
        } else if (data.users) {
          console.log(data);
          setSales(data.users);
        }
      });
      viewSaleProduct().then((data) => {
        console.log(data);
        setSalesProduct(data.product);
        setRremoveProduct(data.products);
      });
      viewRemaningProduct().then((data) => {
        console.log(data);
        setLeftProducts(data.products);
        setRemaningProduct(data.product);
      });
    }
  }, []);

  const handleSaleProduct = () => {
    setOpenPopup(true);
  };

  const handleLeftProduct = () => {
    setOpenLeftProducts(true);
  };
  return (
    <div>
      {username === "sales" ? (
        props.history.push("/salesDashboard")
      ) : (
        <OftadehLayout>
          <div>
            {loading ? (
              <PageSpinner />
            ) : (
              <div style={{ width: "100%" }}>
                <Reports />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                    p: 1,
                    m: 1,
                    // bgcolor: 'background.paper',
                    borderRadius: 1,
                  }}
                >
                  <Item>
                    <Card className={classes.card}>
                      <ButtonBase onClick={handleLeftProduct}>
                        <CardContent
                          className={classes.cardContent}
                          style={{ backgroundColor: "#39f" }}
                        >
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              spacing={0}
                              direction="column"
                              alignItems="center"
                              justify="center"
                              style={{ minHeight: "100vh" }}
                            >
                              {remaningProducts}
                              <div>On Stock Products</div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </ButtonBase>
                    </Card>
                  </Item>
                  <Item>
                    <Card className={classes.card}>
                      <ButtonBase onClick={handleSaleProduct}>
                        <CardContent
                          className={classes.cardContent}
                          style={{ backgroundColor: "#225f4f" }}
                        >
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              spacing={0}
                              direction="column"
                              alignItems="center"
                              justify="center"
                              style={{ minHeight: "100vh" }}
                            >
                              {salesProduct}
                              <div>Sale Products</div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </ButtonBase>
                    </Card>
                  </Item>
                  <Item>
                    <Link
                      to="/Sales"
                      style={{ color: "#FFF", textDecoration: "none" }}
                    >
                      <Card className={classes.card}>
                        <CardContent
                          style={{ backgroundColor: "#00688b" }}
                          className={classes.cardContent}
                        >
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              spacing={0}
                              direction="column"
                              alignItems="center"
                              justify="center"
                              style={{ minHeight: "100vh" }}
                            >
                              {sales.length}
                              <div>Sales Persones</div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Link>
                  </Item>
                  <Item>
                    <Link
                      to="/categorie"
                      style={{ color: "#FFF", textDecoration: "none" }}
                    >
                      <Card className={classes.card}>
                        <CardContent
                          style={{
                            backgroundColor: "#e91e63",
                            alignItems: "center",
                          }}
                          className={classes.cardContent}
                        >
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              spacing={0}
                              direction="column"
                              alignItems="center"
                              justify="center"
                              style={{ minHeight: "100vh" }}
                            >
                              {categorie.length} <div>Categories</div>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Link>
                  </Item>
                </Box>
              </div>
            )}

            <Popup
              title="Product Detaile"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <ViewSaleProduct products={removeProducts} />
            </Popup>
            <Popup
              title="Product Detaile"
              openPopup={opetLeftProduct}
              setOpenPopup={setOpenLeftProducts}
            >
              <ViewRemaningProduct products={leftProducts} />
            </Popup>
          </div>
        </OftadehLayout>
      )}
    </div>
  );
}
