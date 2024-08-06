import React from "react";
import { Card, Typography } from "@material-tailwind/react";

const OverviewStore = () => {
  return (
    <>
      <div className="flex w-full max-h-[20vh] overflow-x-auto overflow-y-hidden ">
        <Card shadow="lg" className="p-3 pt-5 flex flex-row gap-3 border-2 border-black">
            <div className="h-full flex-1 rounded-lg border-2 border-black">
                <Typography variant="small">Total Products</Typography>
            </div>
            <div className="h-full flex-1 rounded-lg border-2 border-black">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate est ratione ab neque eveniet modi possimus, nostrum impedit quo amet incidunt omnis vero et inventore, autem voluptatem aperiam ut sapiente, fugit explicabo illum aliquid. Consequatur doloribus quod expedita voluptatem quibusdam? Accusamus saepe deserunt hic nemo non dolore nisi quos temporibus eum error magnam, rerum atque inventore eligendi blanditiis cumque iste reiciendis? Voluptatem repellat inventore provident. Exercitationem odit voluptas eaque fugit voluptatum quod aliquam earum, consequuntur illum labore rerum quam, in molestias modi officiis nulla perspiciatis expedita excepturi consectetur ex odio nisi! Sunt, saepe ut mollitia ipsum molestias libero ullam cum.</p>
            </div>
            <div className="h-full flex-1 rounded-lg border-2 border-black">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate est ratione ab neque eveniet modi possimus, nostrum impedit quo amet incidunt omnis vero et inventore, autem voluptatem aperiam ut sapiente, fugit explicabo illum aliquid. Consequatur doloribus quod expedita voluptatem quibusdam? Accusamus saepe deserunt hic nemo non dolore nisi quos temporibus eum error magnam, rerum atque inventore eligendi blanditiis cumque iste reiciendis? Voluptatem repellat inventore provident. Exercitationem odit voluptas eaque fugit voluptatum quod aliquam earum, consequuntur illum labore rerum quam, in molestias modi officiis nulla perspiciatis expedita excepturi consectetur ex odio nisi! Sunt, saepe ut mollitia ipsum molestias libero ullam cum.</p>
            </div>
            <div className="h-full flex-1 rounded-lg border-2 border-black">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate est ratione ab neque eveniet modi possimus, nostrum impedit quo amet incidunt omnis vero et inventore, autem voluptatem aperiam ut sapiente, fugit explicabo illum aliquid. Consequatur doloribus quod expedita voluptatem quibusdam? Accusamus saepe deserunt hic nemo non dolore nisi quos temporibus eum error magnam, rerum atque inventore eligendi blanditiis cumque iste reiciendis? Voluptatem repellat inventore provident. Exercitationem odit voluptas eaque fugit voluptatum quod aliquam earum, consequuntur illum labore rerum quam, in molestias modi officiis nulla perspiciatis expedita excepturi consectetur ex odio nisi! Sunt, saepe ut mollitia ipsum molestias libero ullam cum.</p>
            </div>
        </Card>
      </div>
    </>
  );
};

export default OverviewStore;
