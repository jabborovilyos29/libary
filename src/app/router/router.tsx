import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Form } from "../../pages/form/index";
import { Table } from "../../pages/table";
import { Chat } from "../../pages/chat";
import { Home } from "../../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "form",
        element: <Form />,
      },
      {
        path: "table",
        element: <Table />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
]);

export { router };
