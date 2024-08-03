import { MagnifyingGlassIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, Input, Typography, Button, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab, Avatar, IconButton, Tooltip } from "@material-tailwind/react";
import Spinner from "./Spinner";
import SkeletonTable from "./SkeletonTable";
import React, { useState, useEffect } from "react";
import axios from "axios";

const TABLE_HEAD = ["Photo", "Name Products", "Category", "Price", "Actions"];
const ITEMS_PER_PAGE = 6;

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
          <SkeletonTable />
          ) : (
            currentItems.map((product, index) => {
              const isLast = index === currentItems.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
              return (
                <tr key={product.id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={product.thumbnail} alt={product.title} size="md" className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1" />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {product.title}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {product.category}
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
