import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Card, Input, Textarea, Button } from "@material-tailwind/react";
import CurrencyInput from "react-currency-input-field";
import axios from "axios";
import Autocomplete from "@mui/joy/Autocomplete";

const AddProductPage = ({ addProductSubmit }) => {
  // Form
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const uniqueCategories = [...new Set(response.data.map((product) => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Submit
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      price,
      description,
      image,
      category,
    };
    addProductSubmit(newProduct);
    return navigate("/");
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
            <form onSubmit={submitForm} className="max-w-screen mt-8 mb-2">
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
                <Button id="submitBtn" name="submitBtn" type="submit" className="mt-6 w-fit mx-auto">
                  Add Product
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
