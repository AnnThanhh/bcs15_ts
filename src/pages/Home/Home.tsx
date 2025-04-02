import { useDispatch, useSelector } from "react-redux";
import { DispatchType, Rootstate } from "../../redux/store";
import {
  getAllProductActionApi,
  ProductionModelType,
} from "../../redux/reducer/productReducer";
import ProductCard from "../ProductCard/ProductCard";
import { useEffect } from "react";

const Home = () => {
  const { arrProduct } = useSelector(
    (state: Rootstate) => state.productReducer
  );

  const dispatch: DispatchType = useDispatch();

  const getAllProduct = async () => {
    const actionAsync = getAllProductActionApi();
    dispatch(actionAsync);
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  console.log("arrProduct", arrProduct);
  return (
    <div className="container">
      <h3>Product List</h3>
      <div className="row">
        {arrProduct?.map((item: ProductionModelType, index: number) => {
          return (
            <div className="col-4 mt-2" key={index}>
              <ProductCard product={item} />;
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
