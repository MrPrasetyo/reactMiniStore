import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import HomePage from "./page/HomePage";
import AboutPage from "./page/AboutPage";
import StorePage from "./page/StorePage";
import MainLayouts from "./Layouts/MainLayouts";

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
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
