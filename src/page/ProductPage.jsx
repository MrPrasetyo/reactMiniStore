import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { IoArrowBack } from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get("category");

  const fallbackData = [
    "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80",
  ];

  const [images, setImages] = useState(fallbackData);
  const [active, setActive] = useState(fallbackData[0]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        const productData = res.data;
        setProduct(productData);

        const productImages = productData.images && productData.images.length > 0
          ? productData.images
          : fallbackData;
        
        setImages(productImages);
        setActive(productImages[0]);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (i - rating < 1) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <section className="bg-white">
      <div className="xl:max-w-7xl md:max-w-5xl mx-auto flex flex-col lg:px-5">
        <Link to={`/category/${categoryName}`} className="flex items-center mt-4">
          <Typography className="flex items-center">
            <IoArrowBack className="w-4 h-4 mr-2" /> Back to Category
          </Typography>
        </Link>
        <div className="flex lg:flex-row flex-col lg:items-start items-center relative py-5">
          {isLoading ? (
            <div className="flex absolute left-[35dvw] h-screen">
              <Spinner />
            </div>
          ) : (
            product && (
              <>
                <div className="xl:max-w-2xl md:max-w-xl">
                  <div className="grid gap-4 md:p-0 p-5 w-[45dvw]">
                    <div className="">
                      {imageLoading && (
                        <Skeleton variant="rectangular" className="lg:w-[670px] md:w-[580px] w-full h-[480px]" />
                      )}
                      <img
                        className={`h-auto w-full max-w-lg rounded-lg object-cover object-center md:h-[480px] grow-0 shrink-0 ${imageLoading ? 'hidden' : 'block'}`}
                        src={active}
                        alt=""
                        onLoad={() => setImageLoading(false)}
                      />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      {images.map((imgelink, index) => (
                        <div key={index}>
                          <img
                            onClick={() => {
                              setActive(imgelink);
                              setImageLoading(true);
                            }}
                            src={imgelink}
                            className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                            alt="gallery-image"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Box display="flex" className="xl:max-w-xl md:max-w-lg px-10 flex-col">
                  <Typography variant="h2" className="text-left">
                    {product.title}
                  </Typography>
                  <Typography className="flex items-center">
                    {renderStars(product.rating)}
                    <span className="ml-2">{product.rating}</span>
                  </Typography>
                  <Typography className="flex items-center">
                    <FaTruckFast />
                  </Typography>
                  <Typography variant="p" className="mt-10 mb-3">
                    {product.description}
                  </Typography>
                  <Typography variant="h4" color="red">
                    ${product.price}
                  </Typography>
                </Box>
              </>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
