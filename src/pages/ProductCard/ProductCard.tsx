import { NavLink } from "react-router-dom";
import {
  ProductionModelType,
  RelatedProduct,
} from "../../redux/reducer/productReducer";

type Props = {
  product: ProductionModelType | RelatedProduct;
};

const ProductCard = (props: Props) => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={props.product.image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.product.name}</h5>
        <NavLink to={`/detail/${props.product.id}`} className="btn btn-primary">
          Detail
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;
