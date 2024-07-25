import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TABLE_HEAD = ["Photo", "Name Products", "Price", "Actions"];

export function TableCompo() {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setStore(res.data);
      } catch (error) {
        console.error("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  });

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {store.map((product, index) => {
            const isLast = index === store.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            return (
              <tr key={product.id}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <Avatar src={product.image} alt={product.title} size="md" className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" />
                  </div>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {product.title}
                  </Typography>
                </td>
                <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        $ {product.price}
                      </Typography>
                    </td>

                <td className={classes}>
                  <Tooltip content="Edit product">
                    <IconButton variant="text">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default TableCompo;
