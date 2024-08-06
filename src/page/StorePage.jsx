import React from "react";
import TableCompo from "../components/TableCompo";
import SidebarStore from "../components/SidebarStore";

const StorePage = () => {
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="h-1/4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo numquam inventore ex eum neque quia amet sapiente aut odio reprehenderit? At, molestias quidem, fugit tempore molestiae deleniti optio, facilis perferendis enim corrupti veritatis! Fugiat odio ab cupiditate! Dolore a ipsa blanditiis iure corporis, quis est vero consequuntur, reprehenderit, ratione aspernatur distinctio eum! Est incidunt velit dolorum cumque? In voluptatum et incidunt qui vitae culpa dolore vero eligendi excepturi corporis illo aspernatur dolorum quibusdam aliquam quae dicta rem consectetur, velit adipisci sequi deserunt consequuntur cupiditate temporibus! Dolorum, culpa dolores amet, blanditiis nam eligendi nobis adipisci magni ipsum quia rem aliquam ducimus.</div>
        <div className="flex h-3/4 w-full px-2">
          <TableCompo />
        </div>
      </div>
    </>
  );
};

export default StorePage;
