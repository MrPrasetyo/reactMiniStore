import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import Spinner from "./Spinner";
import axios from "axios";

const CategoryCard = () => {
  const [kategori, setKategori] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        const uniqueCategories = [...new Set(res.data.map((product) => product.category))];
        setKategori(uniqueCategories);
      } catch (error) {
        console.error("error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <Spinner />
        </div>
      ) : (
        kategori.map((category, index) => (
          <Card key={index} className="w-full max-w-[32rem] flex-row my-4">
            <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
              <img src="https://via.placeholder.com/150" alt="category" className="h-80 w-full object-cover" />
            </CardHeader>
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase text-xs">
                Kategori
              </Typography>
              <Typography variant="h4" color="blue-gray" className="mb-2 text-md">
                {category}
              </Typography>
              <Typography color="gray" className="font-normal mb-4 text-xs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id nihil eius enim accusamus excepturi laudantium, eum fugiat sed veniam iusto.
              </Typography>
              <a href="#" className="inline-block">
                <Button variant="text" className="flex items-center gap-2 p-2">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Button>
              </a>
            </CardBody>
          </Card>
        ))
      )}
    </>
  );
};

export default CategoryCard;
