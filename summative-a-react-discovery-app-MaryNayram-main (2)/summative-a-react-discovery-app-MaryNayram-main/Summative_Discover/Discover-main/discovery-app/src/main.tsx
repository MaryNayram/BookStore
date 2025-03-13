import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./ReduxStore/store.ts";
import ThemeProvider from "./Context/ThemeData.tsx";
import "./index.css";
import HomePage from "./Components/HomePage.tsx";
import AuthorsComponent from "./Components/AuthorsComponent.tsx";
import BooksSection from "./Components/BooksSection.tsx";
import Library from "./Components/Library.tsx";
import Footer from "./Components/Footer.tsx";
import BookDetails from "./Components/BookDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "discover", element: <BooksSection /> },
      { path: "authors", element: <AuthorsComponent /> },
      { path: "library", element: <Library /> },
      { path: "contact", element: <Footer /> },
    ],
  },
  { path: "discover/:id", element: <BookDetails /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
