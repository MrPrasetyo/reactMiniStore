import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const CategoryList = () => {
  const { categoryName } = useParams();
  const [itemKategori, setItemKategori] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/category/${categoryName}`);
        setItemKategori(res.data.products);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoryItems();
  }, [categoryName]);

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <Typography variant="h3" color="blue-gray" className="mb-4">
            {categoryName}
          </Typography>
          <Link to="/category">
            <Typography className="mb-2 flex items-center">
              <IoArrowBack className="w-4 h-4 mr-2"/> Back to Category
            </Typography>
          </Link>
          {itemKategori.length === 0 ? (
            <Typography variant="h6" color="red" className="text-center mt-6">
              Tidak ditemukan produk di kategori ini.
            </Typography>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {itemKategori.map((item, index) => (
                <Card key={index} className="w-full">
                  <CardHeader shadow={false} floated={false} className="m-0 rounded-none">
                    <img src={item.thumbnail} alt={item.title} className="h-64 w-full object-cover" />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      {item.title}
                    </Typography>
                    <Typography color="gray" className="font-normal mb-4">
                      {item.description}
                    </Typography>
                    <Link to={`/product/${item.id}`} className="inline-block">
                      <Button variant="text" className="flex items-center gap-2 p-2">
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryList;
