import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../../utils";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { single_id } = useParams();
  console.log("vdsvf",single_id)
  useEffect(() => {
    axios
      .get(`${baseUrl}products/get-products/${single_id}`)
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
  },[]);
  return <div>Singl</div>;
};

export default SingleProduct;
