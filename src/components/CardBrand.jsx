import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, IconButton, Tooltip } from "@material-tailwind/react";
import profilImage from "../assets/profil.jpg";
import axios from "axios";

const CardBrand = () => {
  const [card, setCard] = useState([]);
  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products?limit=6");
        setCard(res.data);
      } catch (error) {
        console.log("Error fetching Data", error);
      }
    };
    fetchCard();
  }, []);
  return (
    <>
      {card.map((product) => (
        <Card key={product.id} className="w-full sm:w-80 rounded-t-xl mx-auto h-[500px]">
          <CardHeader floated={false} color="blue-gray" className='relative h-56 shrink-0'>
            <img src={product.image} alt="Profile" className="rounded-t-xl w-full h-full object-cover mx-auto" />
            <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
            <Button size="sm" color="white" variant="text" className="!absolute top-4 right-4 rounded-full bg-red-500">
              New
            </Button>
          </CardHeader>
          <CardBody className="text-start overflow-y-auto">
            <h5 className="text-lg font-semibold">{product.title}</h5>
            <p className="text-gray-600">{product.description}</p>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default CardBrand;
