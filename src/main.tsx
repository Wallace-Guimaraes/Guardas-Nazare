import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/layout";

// Lazy imports (carregam sob demanda, melhor performance)
const FichaGuarda  = React.lazy(() => import("./pages/Guardas/Guardas"));
const DashboardAdmin   = React.lazy(() => import("./pages/Dashboard/DasboardAdmin"));
const FrequenciaGuarda   = React.lazy(() => import("./pages/Frequencia/infoGuarda"));

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardAdmin />,
      },
      {
        path: "guardas",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <FichaGuarda />
          </React.Suspense>
        ),
      },
      {
        path: "guardas/:matricula",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <FichaGuarda />
          </React.Suspense>
        ),
      },
      {
        path: "frequencia",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <FrequenciaGuarda />
          </React.Suspense>
        ),
      },
      {
        path: "cadastro",
        element: (
          <React.Suspense fallback={<PageLoader />}>
  
          </React.Suspense>
        ),
      },
      {
        path: "locais",
        element: (
          <React.Suspense fallback={<PageLoader />}>
           
          </React.Suspense>
        ),
      },
    ],
  },
]);

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);