import React from "react";
import TableCompo from "../components/TableCompo";
import OverviewStore from "../components/OverviewStore";

const StorePage = () => {
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-full max-w-7xl h-full z-10">
          <div className="flex-1 overflow-y-auto px-10 py-2">
            <OverviewStore />
          </div>
          <div className="flex flex-3 w-full px-10 py-2">
            <TableCompo />
          </div>
        </div>
      </div>
    </>
  );
};

export default StorePage;
