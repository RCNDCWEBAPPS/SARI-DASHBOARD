import React from "react";
import { Redirect } from "react-router-dom";

import {DashboardPageConfig } from "../pages/dashboard/DashboardPageConfig";
import { LoginPageConfig } from "../pages/auth/login/LoginPageConfig";
import { Error404PageConfig } from "../pages/errors/404/Error404PageConfig";
import { Error500PageConfig } from "../pages/errors/500/Error500PageConfig";
import{SalesCategoriePageCOnfig} from '../pages/Sales/categorie/categoriePageConfig'
import {RigisterConfig} from '../pages/auth/login/RigisterConfig'
import {SalesPageConfig} from '../pages/Admin/ManageSales/salesPageConfig'
import {CategoriePageCOnfig} from "../pages/Admin/ManageCategory/categoryPageConfig"
import {ProductPageConfig} from '../pages/Admin/ManagePoducts/productsPageConfig'
import {SalesLoginConfig} from '../pages/auth/salesLogin/salesLoginConfig'
import {SalesProductPageConfig} from '../pages/Sales/productPage' 
import {HomePageCofig} from '../pages/Sales/HomePageConfig'
import {ProductReoprtPageConfig} from '../pages/Admin/ManagePoducts/ProductReportPageConfig'
import {SalesProductReoprtPageConfig} from '../pages/Admin/ManagePoducts/SalesProductReportPageConfig'
const routeConfigs = [
  ...SalesProductReoprtPageConfig.routes,
  ...ProductReoprtPageConfig.routes,
  ...SalesCategoriePageCOnfig.routes,
  ...HomePageCofig.routes,
  ...SalesProductPageConfig.routes,
  ...SalesLoginConfig.routes,
  ...ProductPageConfig.routes,
  ...CategoriePageCOnfig.routes,
...SalesPageConfig.routes,
...RigisterConfig.routes,
  ...DashboardPageConfig.routes,
  ...LoginPageConfig.routes,
  ...Error404PageConfig.routes,
  ...Error500PageConfig.routes,
];

const routes = [
  ...routeConfigs,
  {
    component: () => <Redirect to="/pages/errors/error-404" />
  }
];

export default routes;
