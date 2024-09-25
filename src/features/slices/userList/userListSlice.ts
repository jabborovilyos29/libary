import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUsersListInitialState } from "../../models";

const initialState: IUsersListInitialState = { usersList: [] };

export const usersListSlice = createSlice({
  name: "usersList",
  initialState,
  reducers: {
    getUsers: (
      state: IUsersListInitialState,
      { payload }: PayloadAction<IUser[]>,
    ) => {
      state.usersList = payload;
    },
    addUser: (
      state: IUsersListInitialState,
      { payload }: PayloadAction<IUser>,
    ) => {
      state.usersList.push(payload);
    },
  },
});

export const { getUsers, addUser } = usersListSlice.actions;

const usersListReducer = usersListSlice.reducer;
export default usersListReducer;
