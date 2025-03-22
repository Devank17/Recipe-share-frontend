import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import RecipesPage from "../pages/recipes/RecipesPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import AboutPage from "../pages/about/AboutPage";
import ContactPage from "../pages/contact/ContactPage";
import NotFound from "../components/NotFound";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Profile from "../components/Profile";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsofService from "../components/TermsofService";
import CreateRecipe from "../components/CreateRecipe";
import ViewRecipe from "../components/ViewRecipe";
import CategoryPage from "../components/CategoryPage";
import EditRecipe from "../components/EditRecipe";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/recipes",
        element: <RecipesPage />,
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/service",
        element: <TermsofService />,
      },
      {
        path: "/policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipe/new",
        element: (
          <PrivateRoute>
            <CreateRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/recipes/:id",
        element: <ViewRecipe />,
      },
      {
        path: "/recipes/:id/edit",
        element: (
          <PrivateRoute>
            <EditRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/categories/:name",
        element: <CategoryPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
