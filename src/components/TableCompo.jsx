import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip } from "@material-tailwind/react";
import Spinner from "./Spinner";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TABLE_HEAD = ["Photo", "Name Products", "Price", "Actions"];
const ITEMS_PER_PAGE = 8;

export function TableCompo() {
  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = store.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(store.length / ITEMS_PER_PAGE);

  return (
    <Card className="h-full w-full overflow-x-scroll">
      <table className="w-full min-w-max table-auto text-left relative">
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
        {loading ? (
          <div className="flex xl:ml-[25dvw] lg:ml-[37dvw] md:ml-[40dvw] ml-[30dvw]">
            <Spinner loading={loading} /></div>
          ) : (
            currentItems.map((product, index) => {
              const isLast = index === currentItems.length - 1;
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
                    <Typography variant="small" color="blue-gray" className="font-normal">
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
            })
          )}
        </tbody>
      </table>
      <div className="flex justify-between p-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </Card>
  );
}

export default TableCompo;
