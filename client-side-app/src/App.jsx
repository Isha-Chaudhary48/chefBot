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
      { path: "/", element: <About /> }, //  Home page
      { path: "/recipe", element: <Recipe /> }, //  Recipe page
      { path: "/meal/:id", element: <MealRecipe /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
