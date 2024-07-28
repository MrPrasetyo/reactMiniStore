import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import HomePage from "./page/HomePage";
import AboutPage from "./page/AboutPage";
import StorePage from "./page/StorePage";
import AddProductPage from "./page/AddProductPage";
import MainLayouts from "./Layouts/MainLayouts";
import NotFoundPage from "./page/NotFoundPage";

// Add

// Edit

// Delete

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
