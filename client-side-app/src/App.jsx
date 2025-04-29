import "./App.css";

import Navbar from "./components/NavbarElements/Navbar";

import Footer from "./components/Footer";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { About } from "./components/AILogic/About";
import { Recipe } from "./components/NavbarElements/Recipe";
import MealRecipe from "./components/NavbarElements/MealRecipe";
import Dashboard from "./components/NavbarElements/Dashboard";
import CreatePost from "./components/NavbarElements/CreatePost";
import UserPostedRecipes from "./components/NavbarElements/UserPostedRecipes";
import UserAllRecipesSection from "./components/UserAllRecipes/UserAllRecipesSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="content">
        <Outlet /> {/* The *active* page's content will be rendered here */}
      </div>
      <Footer />
    </>
  );
}

let router = createBrowserRouter([
  {
    element: <RootLayout />, //  Use RootLayout here!
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/chefBot", element: <About /> }, //  Home page
      { path: "/recipe", element: <Recipe /> }, //  Recipe page
      { path: "/meal/:id", element: <MealRecipe /> },
      { path: "/createPost", element: <CreatePost /> },
      {
        path: "/userPostedRecipes/:id",
        element: <UserPostedRecipes />,
      },
      { path: "/userAllRecipes/:id", element: <UserAllRecipesSection /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
