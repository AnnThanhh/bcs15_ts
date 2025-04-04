import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, httpClient, USER_LOGIN } from "../../util/util";
import { getDataJsonStorage, setCookie } from "../../util/utilMethod";
import { UserLoginType } from "../../pages/Login/Login";
import { DispatchType } from "../store";
import { routeLink } from "../../App";
//rxslice
export interface UserLoggedType {
  email: string;
  accessToken: string;
}

interface UserReducerType {
  userLogin: UserLoggedType | null;
}

const initialState: UserReducerType = {
  userLogin: getDataJsonStorage(USER_LOGIN), //{}
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setLoginAction: (
      state: UserReducerType,
      action: PayloadAction<UserLoggedType>
    ) => {
      state.userLogin = action.payload;
    },
  },
});

export const { setLoginAction } = userReducer.actions;

export default userReducer.reducer;

export const LoginApiAction = (userLogin: UserLoginType) => {
  return async (dispatch: DispatchType) => {
    try {
      const res = await httpClient.post("api/Users/signin", userLogin);
      //sau khi đăng nhập thành công thì chuyển trang qua profile đồng thời lưu thông tin vào localstorage
      setCookie(ACCESS_TOKEN, res.data.content.accessToken, 30);

      const action: PayloadAction<UserLoggedType> = setLoginAction(
        res.data.content
      );
      dispatch(action);

      routeLink("/profile");
    } catch (err) {
      console.log(err);
    }
  };
};
