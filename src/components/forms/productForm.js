import Controls from "../ui/controls/Controls";
import React from "react";
import { Form, useForm } from "../ui/useForm";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import AdminRequest from "../request/Admin/productRequest";
import AdminRequestCategorie from "../request/Admin/categoryRequest";
import SalesApiRequests from "../request/salesRequest";
import produce from "immer";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
const initialFValues = {
  name: "",
  frameMaterieal: "",
  categoryName: null,
  size: "",
  price: "",
  quantity: "",
  modelNo: "",
  color: "",
  description: "",
  image: null,
  editing: false,
};
const useStyles = makeStyles((theme) => ({
  icon: {
    borderRadius: "50%",
    height: "40px",
    width: "40px",
  },
}));
const ProductForm = ({
  NotifyMessage,
  setOpenPopup,
  recordForEdit,
  setProducts,
  role,
  productImage,
  setLoading,
}) => {
  const {
    salesAddProduct,
    salesViewAllProduct,
    salesViewAllCategory,
    salesUpdateProduct,
  } = SalesApiRequests();
  const { addProduct, viewAllProduct, updateProduct } = AdminRequest();
  const [categoryName, setCategorie] = useState([]);
  const [products, setProduct] = useState([]);
  const { viewAllCategory } = AdminRequestCategorie();
  const [file, setfile] = useState(null);
  const roomImagePicker = useRef(null);
  useEffect(() => {
    console.log(productImage.imageURI);
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit,
      });
      setfile(productImage.imageURI);
    }
  }, [recordForEdit]);
  console.log(role);
  useEffect(() => {
    console.log(role);
    if (role === "sales") {
      salesViewAllCategory().then((data) => {
        console.log(data);
        if (data.err) {
          NotifyMessage({
            message: data.err,
            type: "error",
          });
        } else if (data.categorys) {
          setCategorie(data.categorys);
        }
      });
    } else {
      viewAllCategory().then((data) => {
        if (data.err) {
          NotifyMessage({
            message: data.err,
            type: "error",
          });
        } else if (data.categorys) {
          setCategorie(data.categorys);
        }
      });
    }
  }, []);
  const validate = (fieldValues = values) => {
    const temp = { ...errors };
    const regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if ("name" in fieldValues)
      temp.name =
        fieldValues.name.length !== 0 ? "" : "This field is required.";

    if ("frameMaterieal" in fieldValues)
      temp.frameMaterieal =
        fieldValues.frameMaterieal.length !== 0
          ? ""
          : "This field is required.";

    if ("description" in fieldValues)
      temp.description =
        fieldValues.description.length !== 0 ? "" : "This field is required.";
    if ("modelNo" in fieldValues)
      temp.modelNo =
        fieldValues.modelNo.length !== 0 ? "" : "This field is required.";
    if ("color" in fieldValues)
      temp.color =
        fieldValues.color.length !== 0 ? "" : "This field is required.";
    if ("price" in fieldValues)
      temp.price =
        fieldValues.price.length !== 0 ? "" : "This field is required.";
    if ("quantity" in fieldValues)
      temp.quantity =
        fieldValues.quantity.length !== 0 ? "" : "This field is required.";
    if ("size" in fieldValues)
      temp.size =
        fieldValues.size.length !== 0 ? "" : "This field is required.";
    if ("categoryName" in fieldValues)
      temp.categoryName =
        fieldValues.categoryName != null ? "" : "This field is required.";
    if (values.editing == false) {
      if ("image" in fieldValues)
        temp.image = fieldValues.image != null ? "" : "This field is required.";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  var formData = new FormData();
  formData.append("username", "Groucho");
  formData.append("accountnum", 123456);
  console.log(values.categoryName);
  const data = new FormData();
  data.append("name", "alemgewnaa");
  console.log(data.get("username"));
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();

    if (validate()) {
      formData.append("name", values.name);
      formData.append("frameMaterieal", values.frameMaterieal);
      formData.append("categoryName", values.categoryName.name);
      formData.append("size", values.size);
      formData.append("price", values.price);
      formData.append("quantity", values.quantity);
      formData.append("modelNo", values.modelNo);
      formData.append("color", values.color);
      formData.append("description", values.description);
      formData.append(
        "image",
        values.image instanceof File ? values.image : null
      );
      setValues({ ...values, submitting: true });
      if (values.editing === false) {
        if (role === "sales") {
          console.log(values.color);
          salesAddProduct(formData).then((data) => {
            console.log(data);
            if (data.err) {
              setValues({ ...values, submitting: false });
              NotifyMessage({
                message: data.err,
                type: "error",
              });
            } else {
              salesViewAllProduct().then((data) => {
                if (data.products) {
                  setProducts(data.products);
                }
              });
              NotifyMessage({
                message: "Product created.",
                type: "success",
              });
              setOpenPopup(false);
              resetForm();
            }
          });
        } else {
          addProduct(formData).then((data) => {
            console.log(data);
            if (data.err) {
              setValues({ ...values, submitting: false });
              NotifyMessage({
                message: data.err,
                type: "error",
              });
            } else {
              viewAllProduct().then((data) => {
                if (data.products) {
                  ///  console.log(data.products)
                  //  setLoading(false)
                  setProducts(data.products);
                }
              });
              NotifyMessage({
                message: "Product created.",
                type: "success",
              });
              setOpenPopup(false);
              resetForm();
            }
          });
        }
      } else {
        if (role === "sales") {
          salesUpdateProduct(formData, recordForEdit.id).then((data) => {
            console.log(formData);
            if (data.err) {
              setValues({ ...values, submitting: false });
              NotifyMessage({
                message: data.err,
                type: "error",
              });
            } else {
              NotifyMessage({
                message: "Product updated.",
                type: "success",
              });
              setOpenPopup(false);
              resetForm();
              salesViewAllProduct().then((data) => {
                if (data.products) {
                  ///  console.log(data.products)
                  //  setLoading(false)
                  setProducts(data.products);
                }
              });
            }
          });
        } else {
          console.log(roomImagePicker);

          updateProduct(formData, recordForEdit.id).then((data) => {
            console.log(data);
            if (data.err) {
              setValues({ ...values, submitting: false });
              NotifyMessage({
                message: data.err,
                type: "error",
              });
            } else {
              NotifyMessage({
                message: "Product updated.",
                type: "success",
              });
              setOpenPopup(false);
              resetForm();
              viewAllProduct().then((data) => {
                if (data.products) {
                  ///  console.log(data.products)
                  //  setLoading(false)
                  setProducts(data.products);
                }
              });
            }
          });
        }
      }
    }
  };
  const classes = useStyles();

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Controls.Input
            fullWidth
            label="Product Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Frame Materieal"
            name="frameMaterieal"
            value={values.frameMaterieal}
            onChange={handleInputChange}
            error={errors.frameMaterieal}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Size"
            name="size"
            value={values.size}
            onChange={handleInputChange}
            error={errors.size}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Color"
            name="color"
            value={values.color}
            onChange={handleInputChange}
            error={errors.color}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Price"
            name="price"
            type="number"
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Quantity"
            name="quantity"
            value={values.quantity}
            onChange={handleInputChange}
            error={errors.quantity}
            type="number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            label="Model"
            name="modelNo"
            value={values.modelNo}
            onChange={handleInputChange}
            error={errors.modelNo}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.AutoComplete
            values={values}
            setChange={setValues}
            options={categoryName}
            label="Categorie"
            error={errors.categoryName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controls.Input
            values={values.description}
            onChange={handleInputChange}
            label="description"
            name="description"
            error={errors.description}
          />
        </Grid>

        {values.editing == true ? (
          <Grid container item xs={12} md={6} spacing={2}>
            <Grid item xs={8} md={2}>
              {" "}
              {file && <img className={classes.icon} src={file} alt={file} />}
            </Grid>
            <Grid item xs={4} md={4}>
              <Button
                onClick={() => {
                  roomImagePicker.current.click();
                }}
                style={{
                  backgroundColor: "#203040",
                  //  width: '70px',
                  color: "white",
                }}
                variant="contained"
                endIcon={<PhotoCamera />}
              >
                Image
              </Button>
              <input
                label="Logo"
                name="image"
                type="file"
                hidden
                accept="image/*"
                ref={roomImagePicker}
                onChange={handleInputChange}
                autoFocus={true}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} md={6}>
            <Controls.Input
              name="image"
              type="file"
              onChange={handleInputChange}
              error={errors.image}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Controls.Button
            color="primary"
            variant="outlined"
            disabled={values.submitting ? true : false}
            text={
              values.editing === true
                ? values.submitting
                  ? "Editing..."
                  : "Edit"
                : values.submitting
                ? "Adding..."
                : "Add"
            }
            className="Button"
            type="submit"
          />
        </Grid>
      </Grid>
    </Form>
  );
};
export default ProductForm;
