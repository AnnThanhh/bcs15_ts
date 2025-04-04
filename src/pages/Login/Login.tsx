import { useFormik } from "formik";
import React from "react";
import { LoginApiAction } from "../../redux/reducer/userReducer";
import { DispatchType } from "../../redux/store";
import { useDispatch } from "react-redux";

type Props = {};

export type UserLoginType = {
  email: string;
  password: string;
};

const Login = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const frmLogin = useFormik<UserLoginType>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (userLogin: UserLoginType) => {
      console.log(userLogin);
      const action = LoginApiAction(userLogin);
      dispatch(action);
    },
  });
  return (
    <div className="container">
      <form onSubmit={frmLogin.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            onChange={frmLogin.handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={frmLogin.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
