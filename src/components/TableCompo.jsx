import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip } from "@material-tailwind/react";
import Spinner from "./Spinner";
import SkeletonTable from "./SkeletonTable";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

const TABLE_HEAD = ["Photo", "Name Products", "Category", "Price", "Rating", "Actions"];
const ITEMS_PER_PAGE = 6;

const getCategoryBackgroundColor = (category) => {
  switch (category) {
    case "beauty":
      return "bg-green-500";
    case "fragrances":
      return "bg-pink-400";
    case "furniture":
      return "bg-amber-700";
    case "groceries":
      return "bg-lime-500";
    default:
      return "bg-gray-200";
  }
};

export function TableCompo() {
  const [store, setStore] = useState([]);
  const [filteredStore, setFilteredStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products');
        setStore(res.data.products);
        setFilteredStore(res.data.products);
      } catch (error) {
        console.error("Error Fetching Data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = store.filter((product) => 
      product.title.toLowerCase().includes(term)
    );
    setFilteredStore(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredStore.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredStore.length / ITEMS_PER_PAGE);

  return (
    <Card className="h-full w-full overflow-x-scroll">
      <div className="p-4 flex justify-between items-center w-1/4">
        <Input
          label="Search Products"
          value={searchTerm}
          onChange={handleSearch}
          icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
        />
      </div>
      <table className="w-full table-auto text-left relative">
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
          <SkeletonTable />
          ) : (
            currentItems.map((product, index) => {
              const isLast = index === currentItems.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={product.id}>
                  <td className={`${classes} w-24`}>
                    <div className="flex items-center gap-3">
                      <Avatar src={product.thumbnail} alt={product.title} size="md" className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" />
                    </div>
                  </td>
                  <td className={`${classes} w-96`}>
                    <div className="flex flex-col">
                      <Typography variant="h6" color="blue-gray" className="text-md">{product.title}</Typography>
                      <Typography variant="small" className="text-sm font-normal text-gray-500">{product.brand}</Typography>
                    </div>
                    
                  </td>
                  <td className={`${classes} w-44`}>
                    <Typography variant="small" className={`font-normal px-2 py-1 rounded-full w-fit h-fit text-white ${getCategoryBackgroundColor(product.category)}`}>
                      {product.category}
                    </Typography>
                  </td>
                  <td className={`${classes} w-40`}>
                    <div className="flex flex-col">
                      <Typography className="font-bold text-red-500 text-md tracking-tight"><span className="text-gray-900 font-thin">$ </span>{product.price}</Typography>
                      <Typography className="text-xs text-gray-500">stock : {product.stock}</Typography>
                    </div>
                  </td>
                  <td className={`${classes}`}>
                  <Typography className="flex items-center">
                    <FaStar className="text-yellow-500"/><span className="ml-2">{product.rating}</span>
                  </Typography>
                  </td>
                  <td className={`${classes} w-24`}>
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
