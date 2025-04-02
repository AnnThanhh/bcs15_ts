import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DispatchType, Rootstate } from "../../redux/store";
import {
  getProductDetailActionApi,
  RelatedProduct,
} from "../../redux/reducer/productReducer";
import ProductCard from "../ProductCard/ProductCard";

type Props = {};

const Details = (props: Props) => {
  const params = useParams();
  const { id } = params;
  const { productDetail } = useSelector(
    (state: Rootstate) => state.productReducer
  );
  const dispatch: DispatchType = useDispatch();

  const getDetailsProduct = async () => {
    const actionAsync = getProductDetailActionApi(id as string);
    dispatch(actionAsync);
  };
  console.log(productDetail);
  useEffect(() => {
    getDetailsProduct();
  }, [id]);
  return (
    <div className="container">
      <h3>Detail Page - {id}</h3>
      <div className="row">
        <div className="col-4">
          <img src={productDetail?.image} alt="" className="w-100" />
        </div>
        <div className="col-8">
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.description}</p>
          {productDetail?.size.map((size: string, index: number) => {
            return (
              <button className="me-2 btn btn-dark" key={index}>
                {size}
              </button>
            );
          })}
          <button className="btn btn-dark">Add to cart</button>
        </div>
      </div>
      <div className="mt-2">
        <h3>Related Product</h3>
        <div className="row">
          {productDetail?.relatedProducts.map(
            (prod: RelatedProduct, index: number) => {
              return (
                <div className="col-4" key={index}>
                  <ProductCard product={prod} />
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
