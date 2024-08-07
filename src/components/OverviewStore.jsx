import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

const OverviewStore = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [highestRating, setHighestRating] = useState(0);
  const [totalStock, setTotalStock] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        const products = data.products;
        const totalProducts = products.length;
        const totalPrices = products.reduce((acc, product) => acc + product.price, 0);
        const averagePrice = (totalPrices / totalProducts).toFixed(2);
        const highestRating = Math.max(...products.map(product => product.rating));
        const totalStock = products.reduce((acc, product) => acc + product.stock, 0);

        setTotalProducts(totalProducts);
        setAveragePrice(averagePrice);
        setHighestRating(highestRating);
        setTotalStock(totalStock);
      });
  }, []);

  return (
<>
      <div className="flex w-full max-h-[20vh] overflow-x-auto overflow-y-hidden ">
        <Card shadow="lg" className="p-3 pt-5 flex flex-row border-2 border-black">
            <div className="h-full w-[18em] flex-1 px-5 border-r-2 border-black">
                <Typography variant="h5">{totalProducts}</Typography>
            </div>
            <div className="h-full w-[18em] flex-1 px-5 border-r-2 border-black">
            <Typography variant="h5">{averagePrice}</Typography>
            </div>
            <div className="h-full w-[18em] flex-1 px-5 border-r-2 border-black">
            <Typography variant="h5">{highestRating}</Typography>
            </div>
            <div className="h-full w-[18em] flex-1 px-5 border-r-2 border-black">
                <Typography variant="h5">{totalStock}</Typography>
            </div>
        </Card>
      </div>
    </>
  );
};

export default OverviewStore;
