import React from "react";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "200px auto",
};

const Spinner = ({ loading }) => {
  return (

        <ClipLoader color="#4338ca" loading={loading} cssOverride={override} size={50} />

  );
};

export default Spinner;
