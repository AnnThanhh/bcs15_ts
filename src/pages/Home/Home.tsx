import React from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../redux/store";

type Props = {};

const Home = (props: Props) => {
  const { number } = useSelector((state: Rootstate) => state.number);
  return <div>Home</div>;
};

export default Home;
