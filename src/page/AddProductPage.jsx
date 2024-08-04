import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Button } from "@material-tailwind/react";
import Input from "@mui/material/Input";
import Textarea from "@mui/joy/Textarea";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";
import Autocomplete from "@mui/joy/Autocomplete";
import { GoPlus } from "react-icons/go";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddProductPage = ({ addProductSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedImageUrls, setSelectedImageUrls] = useState([]);

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
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [warrantyInformation, setWarrantyInformation] = useState("");
  const [shippingInformation, setShippingInformation] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateField = (name, value) => {
    setErrors((prevErrors) => {
      if (!value) {
        return { ...prevErrors, [name]: "Field ini harus diisi" };
      } else {
        const { [name]: removedError, ...rest } = prevErrors;
        return rest;
      }
    });
  };

  const handleInputChange = (setter, name) => (e) => {
    const { value } = e.target;
    setter(value);
    validateField(name, value);
  };

  const handlePriceChange = (value) => {
    setPrice(value);
    validateField("price", value);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImageUrls((prevUrls) => [...prevUrls, ...imageUrls]);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Field ini harus diisi";
    if (!price) newErrors.price = "Field ini harus diisi";
    if (!description) newErrors.description = "Field ini harus diisi";
    if (!category) newErrors.category = "Field ini harus diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = () => {
    if (!validateForm()) return;

    const newProduct = {
      title,
      price,
      description,
      images,
      category,
      stock,
      brand,
      warrantyInformation,
      shippingInformation,
    };
    addProductSubmit(newProduct);
    return navigate("/");
  };

  // Confirmation Dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (validateForm()) {
      setOpen(true);
    }
  };

  const handleClose = (confirm) => {
    setOpen(false);
    if (confirm) {
      submitForm();
    }
  };

  function openFileUpload() {
    document.getElementById("hiddenFile").click();
  }

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
                  required
                  id="prdTitle"
                  error={!!errors.title}
                  name="prdTitle"
                  value={title}
                  onChange={handleInputChange(setTitle, "title")}
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${errors.title ? "" : ""}`}
                />
                {errors.title && (
                  <Typography variant="small" color="red" className="-mb-3 -mt-5">
                    {errors.title}
                  </Typography>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Description
                </Typography>
                <Textarea
                  size="lg"
                  id="prdDescription"
                  name="prdDescription"
                  value={description}
                  minRows={3}
                  onChange={handleInputChange(setDescription, "description")}
                  placeholder="Input Your Description Here"
                  error={!!errors.description}
                  className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ring-1 ring-transparent ${errors.description ? "!border-t-red-500" : ""}`}
                />
                {errors.description && (
                  <Typography variant="small" color="red" className="-mb-3 -mt-5">
                    {errors.description}
                  </Typography>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Price
                </Typography>
                <CurrencyInput
                  id="prdPrice"
                  name="prdPrice"
                  value={price}
                  onValueChange={handlePriceChange}
                  prefix="Rp "
                  placeholder="Enter the Price"
                  decimalsLimit={2}
                  className={`border-[1px] rounded-md border-blue-gray-200 p-2 text-gray-600 text-sm w-fit ${errors.price ? "border-red-500" : ""}`}
                />
                {errors.price && (
                  <Typography variant="small" color="red" className="-mb-3 -mt-5">
                    {errors.price}
                  </Typography>
                )}
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Category
                </Typography>
                <Autocomplete
                  placeholder="Select Category"
                  error={!!errors.category}
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    setCategory(newValue);
                    validateField("category", newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  options={categories}
                  sx={{ width: 300 }}
                  renderInput={(params) => <Input {...params} size="lg" className={`${errors.category ? "border-red-500" : ""}`} />}
                />
                {errors.category && (
                  <Typography variant="small" color="red" className="-mb-3 -mt-5">
                    {errors.category}
                  </Typography>
                )}
                <Button onClick={openFileUpload} className="flex flex-col p-2" variant="outlined">
                  <span className="-mb-5 w-full text-lg">Upload Photos Here</span>
                  <Input onChange={handleFileChange} type="file" id="hiddenFile" className="opacity-0 hidden" multiple />
                  <div className="flex w-full h-24 bg-blue-gray-50 border-2 border-dashed border-black items-center justify-center">
                    <GoPlus size={50} />
                  </div>
                </Button>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {selectedImageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Selected ${index}`} className="h-full w-full object-cover" />
                  ))}
                </div>

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
          <Button onClick={() => handleClose(true)} color="black" className="px-3 py-2">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddProductPage;
