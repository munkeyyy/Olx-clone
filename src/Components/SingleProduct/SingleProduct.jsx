import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../../utils";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${baseUrl}products/get-products/${id}`)
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return <div>SingleProduct</div>;
};

export default SingleProduct;
