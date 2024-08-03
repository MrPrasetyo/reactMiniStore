import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Input, Textarea, Button } from "@material-tailwind/react";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";
import Autocomplete from "@mui/joy/Autocomplete";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddProductPage = ({ addProductSubmit }) => {
  // Form
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        const uniqueCategories = [...new Set(response.data.products.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Form Data
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("https://i.pravatar.cc");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [warrantyInformation, setWarrantyInformation] = useState("");
  const [shippingInformation, setShippingInformation] = useState("");

  const navigate = useNavigate();

  const submitForm = () => {
    const newProduct = {
      title,
      price,
      description,
      images,
      category,
    };
    addProductSubmit(newProduct);
    return navigate("/");
  };

  // Confirmation Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (confirm) => {
    setOpen(false);
    if (confirm) {
      submitForm();
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="Form-Container max-w-xl mx-auto py-10">
          <Card shadow={true} color="transparent" className="p-10">
            <Typography variant="h4" color="blue-gray">
              Add New Products
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details to register.
            </Typography>
            <form id="productForm" className="max-w-screen mt-8 mb-2">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Products Name
                </Typography>
                <Input
                  size="lg"
                  id="prdTitle"
                  name="prdTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Adidas Shoes"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Description
                </Typography>
                <Textarea
                  size="lg"
                  id="prdDescription"
                  name="prdDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Input Your Description Here"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Price
                </Typography>
                <CurrencyInput
                  id="prdPrice"
                  name="prdPrice"
                  value={price}
                  onValueChange={(value) => setPrice(value)}
                  prefix="Rp "
                  placeholder="Enter the Price"
                  decimalsLimit={2}
                  className="border-[1px] rounded-md border-blue-gray-200 p-2 text-gray-600 text-sm w-fit"
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Category
                </Typography>
                <Autocomplete
                  placeholder="Select Category"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    setCategory(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  options={categories}
                  sx={{ width: 300 }}
                  renderInput={(params) => <Input {...params} size="lg" />}
                />
                <Button id="submitBtn" name="submitBtn" type="button" className="mt-6 w-fit mx-auto" onClick={handleClickOpen}>
                  Add Product
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure the data entered is correct?</DialogContentText>
        </DialogContent>
        <DialogActions className="flex items-center justify-center">
          <Button onClick={() => handleClose(false)} color="white" className="ring-1 ring-black px-3 py-2">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" className="px-3 py-2">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProductPage;
