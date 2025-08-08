import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Home } from "./screens/Home";
import { RecipeDetails } from "./screens/RecipeDetails";
import { SavedRecipes } from "./screens/SavedRecipes";
import { Explore } from "./screens/Explore";
import { MealPlanner } from "./screens/MealPlanner";
import { ShoppingList } from "./screens/ShoppingList";
import { Profile } from "./screens/Profile";
import { CreateRecipe } from "./screens/CreateRecipe";
import { AccountSettings } from "./screens/AccountSettings";
import { EditProfile } from "./screens/EditProfile";

// English routes
const englishRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/explore",
    element: <Explore />,
  },
  {
    path: "/recipe/:id",
    element: <RecipeDetails />,
  },
  {
    path: "/saved",
    element: <SavedRecipes />,
  },
  {
    path: "/planner",
    element: <MealPlanner />,
  },
  {
    path: "/lists",
    element: <ShoppingList />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/create-recipe",
    element: <CreateRecipe />,
  },
  {
    path: "/account-settings",
    element: <AccountSettings />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
];

// Arabic routes (with /ar prefix)
const arabicRoutes = englishRoutes.map(route => ({
  ...route,
  path: `/ar${route.path === '/' ? '' : route.path}`
}));

const router = createBrowserRouter([
  ...englishRoutes,
  ...arabicRoutes,
]);

export const App = () => {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
};
