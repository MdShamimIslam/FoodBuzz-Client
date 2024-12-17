import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../components/ErrorPage";
import AvailableFood from "../pages/AvailableFood/AvailableFood";
import PrivateRoute from "./PrivateRoute";
import AddFood from "../pages/AddFood/AddFood";
import ManageFood from "../pages/ManageFood/ManageFood";
import FoodRequest from "../pages/FoodRequest/FoodRequest";
import DetailsFood from "../pages/DetailsFood/DetailsFood";
import UpdateFood from "../pages/ManageFood/UpdateFood";
import SingleManageFood from "../pages/ManageFood/SingleManageFood";

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage/>,
    element: <Main/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/availableFoods",
        element: <AvailableFood/>,
      },
      {
        path: "/detailsFood/:id",
        element: (
          <PrivateRoute>
            <DetailsFood/>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://foodbuzz-server.vercel.app/foods/${params.id}`
          ),
      },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood/>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateFood/:id",
        element: (
          <PrivateRoute>
            <UpdateFood/>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://foodbuzz-server.vercel.app/createFood/${params.id}`
          ),
      },
      {
        path: "/manageFood",
        element: (
          <PrivateRoute>
            <ManageFood/>
          </PrivateRoute>
        ),
      },
      {
        path: "/foodManage/:id",
        element: (
          <PrivateRoute>
            <SingleManageFood/>
          </PrivateRoute>
        ),
      },
      {
        path: "/foodRequest",
        element: (
          <PrivateRoute>
            <FoodRequest/>
          </PrivateRoute>
        ),
      },
      {
        path: "/signIn",
        element: <SignIn/>,
      },
      {
        path: "/signUp",
        element: <SignUp/>,
      },
    ],
  },
]);

export default routes;
