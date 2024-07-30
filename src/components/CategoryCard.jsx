import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import Spinner from "./Spinner";
import axios from "axios";

const CategoryCard = () => {
  const imageKategori = [
    {
      kategoriName: "beauty",
      image: "https://cdn.pixabay.com/photo/2023/08/11/04/41/woman-8182795_960_720.jpg",
    },
    { kategoriName: "fragrances", image: "https://cdn.pixabay.com/photo/2016/06/02/12/29/scent-1431053_960_720.jpg" },
    { kategoriName: "furniture", image: "https://cdn.pixabay.com/photo/2016/11/19/17/25/furniture-1840463_1280.jpg" },
    { kategoriName: "groceries", image: "https://cdn.pixabay.com/photo/2016/03/02/20/13/grocery-1232944_960_720.jpg" },
    { kategoriName: "home decoration", image: "https://cdn.pixabay.com/photo/2017/03/28/12/10/chairs-2181947_1280.jpg" },
    { kategoriName: "kitchen accessories", image: "https://cdn.pixabay.com/photo/2014/11/24/14/35/pot-544071_1280.jpg" },
    { kategoriName: "laptops", image: "https://cdn.pixabay.com/photo/2015/01/08/18/29/startup-593351_960_720.jpg" },
    { kategoriName: "mens shirts", image: "https://cdn.pixabay.com/photo/2020/06/20/16/13/male-5321547_1280.jpg" },
    { kategoriName: "mens shoes", image: "https://cdn.pixabay.com/photo/2021/03/08/12/31/oxford-shoes-6078993_1280.jpg" },
    { kategoriName: "mens watches", image: "https://cdn.pixabay.com/photo/2017/03/20/15/13/wrist-watch-2159351_1280.jpg" },
    { kategoriName: "mobile accessories", image: "https://cdn.pixabay.com/photo/2020/10/20/17/59/casings-5671111_1280.jpg" },
    { kategoriName: "motorcycle", image: "https://cdn.pixabay.com/photo/2016/03/27/17/59/motorcycle-1283299_1280.jpg" },
    { kategoriName: "skin care", image: "https://cdn.pixabay.com/photo/2016/10/26/02/33/makeup-1770509_1280.jpg" },
    {kategoriName: "smartphones", image: "https://cdn.pixabay.com/photo/2016/03/27/19/43/samsung-1283938_1280.jpg"},
    { kategoriName: "sports accessories", image: "https://cdn.pixabay.com/photo/2017/09/13/09/21/hockey-2744912_1280.jpg" },
    { kategoriName: "sunglasses", image: "https://cdn.pixabay.com/photo/2017/07/20/21/08/sunglasses-2523803_960_720.jpg" },
    { kategoriName: "tablets", image: "https://cdn.pixabay.com/photo/2015/01/20/12/51/ipad-605420_1280.jpg" },
    { kategoriName: "tops", image: "https://cdn.pixabay.com/photo/2021/07/01/21/19/hat-6380330_1280.jpg" },
    { kategoriName: "vehicle", image: "https://cdn.pixabay.com/photo/2022/07/31/20/32/volkswagen-7356817_1280.jpg" },
    { kategoriName: "womens bags", image: "https://cdn.pixabay.com/photo/2017/08/20/11/39/handbag-2661412_1280.jpg" },
    { kategoriName: "womens dresses", image: "https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809433_1280.jpg" },
    { kategoriName: "womens jewellery", image: "https://cdn.pixabay.com/photo/2016/07/18/22/40/beads-1527060_1280.jpg" },
    { kategoriName: "womens shoes", image: "https://cdn.pixabay.com/photo/2016/03/27/22/16/fashion-1284496_1280.jpg" },
    { kategoriName: "womens watches", image: "https://cdn.pixabay.com/photo/2013/06/21/21/13/watch-140487_1280.jpg" },
  ];

  const [kategori, setKategori] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products/categories");
        setKategori(res.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, []);

  const getCategoryImage = (categoryName) => {
    const category = imageKategori.find((item) => item.kategoriName.toLowerCase() === categoryName.toLowerCase());
    return category ? category.image : "https://via.placeholder.com/150";
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-full xl:ml-[30dvw] lg:ml-[37dvw] md:ml-[40dvw] ml-[40dvw]">
          <Spinner />
        </div>
      ) : (
        kategori.map((category, index) => (
          <Card key={index} className="w-full max-w-[32rem] flex-row my-4">
            <CardHeader shadow={false} floated={false} className="m-0 w-2/5 shrink-0 rounded-r-none">
              <img src={getCategoryImage(category.name)} alt={category.name} className="h-64 w-full object-cover" />
            </CardHeader>
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase text-xs">
                Kategori
              </Typography>
              <Typography variant="h4" color="blue-gray" className="mb-2 text-md">
                {category.name}
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
