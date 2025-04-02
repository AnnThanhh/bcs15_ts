import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType, GetStateMethodType } from "../store";
import axios from "axios";
export interface ProductionModelType {
  sizes: number[];
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: string;
  shortDescription: string;
  quantity: number;
  deleted: boolean;
  categories: string;
  relatedProducts: string;
  feature: boolean;
  image: string;
  imgLink: string;
}

export interface ProductDetailModelType {
  id: number;
  name: string;
  alias: string;
  price: number;
  feature: boolean;
  description: string;
  size: string[];
  shortDescription: string;
  quantity: number;
  detaildetailedImages: string[];
  image: string;
  imgLink: string;
  categories: Category[];
  relatedProducts: RelatedProduct[];
}

export interface Category {
  id: string;
  category: string;
}

export interface RelatedProduct {
  id: number;
  name: string;
  alias: string;
  feature: boolean;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  imgLink: null;
}

export interface InitialStateType {
  arrProduct: ProductionModelType[];
  productDetail: ProductDetailModelType | null;
}

const initialState: InitialStateType = {
  arrProduct: [],
  productDetail: null,
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setArrProductionAction: (state, action) => {
      state.arrProduct = action.payload;
    },
    setProductDetailAction: (state, action) => {
      state.productDetail = action.payload;
    },
  },
});

export const { setArrProductionAction, setProductDetailAction } =
  productReducer.actions;

export default productReducer.reducer;

export const getAllProductActionApi = () => {
  return async (dispatch: DispatchType, getState: GetStateMethodType) => {
    const res = await axios.get(
      "https://apistore.cybersoft.edu.vn/api/Product"
    );

    //sau khi lấy dữ liệu về thì dispatch action payload
    const action: PayloadAction<ProductionModelType[]> = setArrProductionAction(
      res.data.content
    );
    dispatch(action);
  };
};

export const getProductDetailActionApi = (id: string) => {
  return async (dispatch: DispatchType, getState: GetStateMethodType) => {
    const res = await axios.get(
      `https://apistore.cybersoft.edu.vn/api/Product/getbyid?id=${id}`
    );
    console.log(res.data.content)
    //sau khi lấy dữ liệu về thì dispatch action payload
    const action: PayloadAction<ProductDetailModelType> =
      setProductDetailAction(res.data.content);
    dispatch(action);
  };
};
