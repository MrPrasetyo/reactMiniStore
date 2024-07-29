import React from "react";
import { Collapse, Button, IconButton, Typography, Input } from "@material-tailwind/react";
import CardBrand from "../components/CardBrand";
import { Carousel } from "@material-tailwind/react";

function HeroSection16() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpen(false));
  }, []);
}

const HomePage = () => {
  return (
    <>
      <header className="bg-white">
        <div className="Hero-Box max-w-7xl mx-auto">
          <div className="Hero-Container py-10">
            <div className="flex flex-col justify-center">
              <Typography variant="h1" className="">
                E-Commerce Site
              </Typography>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-cyan-500 via-indigo-300 to-blue-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="cardContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-5">
            <CardBrand />
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
