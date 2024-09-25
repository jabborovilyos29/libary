import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../shared/hooks";
import { getUsers } from "../../../../features/slices/userList/userListSlice";
import { useGetUsersQuery } from "../../../../features/api/servises";

export default function useGetUsers() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isSuccess } = useGetUsersQuery(undefined);
  const users = useAppSelector((state) => state.usersList.usersList);

  useEffect(() => {
    if (!users.length) {
      if (data) {
        dispatch(getUsers(data));
      }
    }
  }, [data, isLoading]);

  return {
    isLoading,
    isSuccess,
  };
}
