// Layout
import LayoutBasic from "../layouts/LayoutBasic";

// Pages
import MeteoDates from "../pages/MeteoDates";

import NotFound from "../pages/NotFound";

const routesClient = [
  {
    path: "/",
    layout: LayoutBasic,
    component: MeteoDates,
  },
  /*   {
    path: "/contact",
    layout: LayoutBasic,
    component: Contact,
  }, */
  {
    path: "/*",
    layout: LayoutBasic,
    component: NotFound,
  },
];

export const routes = [...routesClient];
