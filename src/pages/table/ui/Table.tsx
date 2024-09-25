import { ChangeEvent, useContext } from "react";
import styles from "./Table.module.css";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import { getUsers } from "../../../features/slices/userList/userListSlice";
import { useGetUsers } from "../utils";
import { ThemeConetext } from "../../../shared/ui/ThemeProvider/ThemeProvider";

export default function Table() {
  const dispatch = useAppDispatch();
  const { isLoading } = useGetUsers();

  const themeContext = useContext(ThemeConetext);
  const users = useAppSelector((state) => state.usersList.usersList);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>, id: number) => {
    const newData = users?.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          [evt.target.name]: evt.target.value,
        };
      } else {
        return user;
      }
    });

    dispatch(getUsers(newData));
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Telephone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody
        className={
          themeContext?.theme === "light" ? styles.tbody : styles.tbody_dark
        }
      >
        {users?.map((user) => (
          <tr key={user.id}>
            <td>{Math.round(user.id)}</td>
            <td>
              <input
                name={`name`}
                defaultValue={user.name}
                onChange={(evt) => handleChange(evt, user.id)}
                type="text"
              />
            </td>
            <td>
              <input
                name={`phone`}
                defaultValue={user.phone}
                type="text"
                onChange={(evt) => handleChange(evt, user.id)}
              />
            </td>
            <td>
              <input
                name={`email`}
                defaultValue={user.email}
                type="text"
                onChange={(evt) => handleChange(evt, user.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
