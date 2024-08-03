import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import HomePage from "./page/HomePage";
import AboutPage from "./page/AboutPage";
import StorePage from "./page/StorePage";
import CategoryPage from "./page/CategoryPage";
import ProductPage from "./page/ProductPage";
import CategoryList from "./page/CategoryList";
import AddProductPage from "./page/AddProductPage";
import EditProductPage from "./page/EditProductPage";
import MainLayouts from "./Layouts/MainLayouts";
import NotFoundPage from "./page/NotFoundPage";
import axios from "axios";
import { toast } from "react-toastify";

const App = () => {
  const addProduct = async (newProduct) => {
    try {
      const res = await axios.post('https://dummyjson.com/products/add', newProduct);
      console.log("Product Added Successfully", res.data);
      toast.success("Product Added Successfully");
    } catch (error) {
      console.error("Failed to Add Product", error);
      toast.error("Failed to Add Product");
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/category/:categoryName" element={<CategoryList />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/add-product" element={<AddProductPage addProductSubmit={addProduct} />} />
        <Route path="/edit-product" element={<EditProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
