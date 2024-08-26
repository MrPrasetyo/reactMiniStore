import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { FaStar } from "react-icons/fa";

const OverviewStore = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [highestRating, setHighestRating] = useState(0);
  const [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        const products = data.products;
        const totalProducts = products.length;
        const totalPrices = products.reduce((acc, product) => acc + product.price, 0);
        const averagePrice = (totalPrices / totalProducts).toFixed(2);
        const highestRating = Math.max(...products.map((product) => product.rating));
        const totalStock = products.reduce((acc, product) => acc + product.stock, 0);

        setTotalProducts(totalProducts);
        setAveragePrice(averagePrice);
        setHighestRating(highestRating);
        setTotalStock(totalStock);
      });
  }, []);

  return (
    <>
      <div className="flex w-full max-h-[20vh] overflow-x-auto overflow-y-hidden p-2 ">
        <Card shadow="lg" className="p-3 pt-5 flex flex-row tracking-widest">
          <div className="h-full flex-2 px-5 border-r-2 border-black">
            <Typography variant="small" className="tracking-wide">
              Total Products
            </Typography>
            <Typography className="text-black flex items-center md:text-4xl text-2xl font-bold">
              {totalProducts}<span className="text-[0.7rem] ml-1 font-thin">pcs</span>
              <span className="text-xs px-2 py-1 bg-green-400 text-white rounded-full ml-2">+10%</span>
            </Typography>
          </div>
          <div className="h-full flex-2 px-5 border-r-2 border-black">
            <Typography variant="small" className="tracking-wide">
              Average Prices
            </Typography>
            <Typography className="text-red-500 md:text-4xl text-2xl font-bold"> <span className="text-black">$ </span>
              {averagePrice} <span className="text-xs text-black -ml-1">pcs</span>
            </Typography>
          </div>
          <div className="h-full flex-1 px-5 border-r-2 border-black">
            <Typography variant="small" className="tracking-wide">
              Highest Rating
            </Typography>
            <Typography className="text-black flex items-center md:text-4xl text-2xl font-bold">
            <FaStar className="size-6 text-yellow-500 mr-2"/> {highestRating} 
            </Typography>
          </div>
        </Card>
      </div>
    </>
  );
};

export default OverviewStore;
