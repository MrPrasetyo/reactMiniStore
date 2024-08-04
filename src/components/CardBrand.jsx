import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import axios from "axios";

const CardBrand = () => {
  const [card, setCard] = useState([]);
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=6&skip=19");
        setCard(res.data.products);
      } catch (error) {
        console.log("Error fetching Data", error);
      }
    };
    fetchCard();
  }, []);
  return (
    <>
      {card.map((product) => (
        <Card key={product.id} className="w-full sm:w-80 rounded-t-xl mx-auto h-[30em]">
          <CardHeader floated={false} color="transparent" className="relative h-56 shrink-0">
            <img src={product.thumbnail} alt="Profile" className="rounded-t-xl w-full h-full object-cover mx-auto" />
            <div className="absolute inset-0 h-full w-full" />
            <Button size="sm" color="white" variant="text" className="!absolute top-4 right-4 rounded-full bg-red-500">
              New
            </Button>
          </CardHeader>
          <CardBody className="text-start overflow-y-auto mt-5">
            <h5 className="text-lg font-semibold">{product.title}</h5>
            <p className="text-gray-600">{product.description}</p>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default CardBrand;
