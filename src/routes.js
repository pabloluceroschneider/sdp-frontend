// @material-ui/icons
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import BuildIcon from '@material-ui/icons/Build';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
// core components/views for Admin layout
import Users from "views/Users";
import Companies from "views/Companies";
import BasePlans from "views/BasePlans";
import Products from "views/Products";
import WorkOrders from "views/WorkOrders";

import ProcessView from "views/Process";

export const adminRoutes = [
  {
    path: "/ordenes-de-trabajo",
    name: "Ordenes de Trabajo",
    permissions: ['Administrador'],
    icon: BuildIcon,
    component: WorkOrders,
    layout: "/admin"
  },
  {
    path: "/planos",
    name: "Planos",
    permissions: ['Administrador'],
    icon:  PermDataSettingIcon,
    component: BasePlans,
    layout: "/admin"
  },
  {
    path: "/productos",
    name: "Productos",
    permissions: ['Administrador'],
    icon:  "content_paste",
    component: Products,
    layout: "/admin"
  },
  {
    path: "/empresas",
    name: "Empresas",
    permissions: ['Administrador'],
    icon: BusinessIcon,
    component: Companies,
    layout: "/admin"
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    permissions: ['Administrador'],
    icon: PeopleIcon,
    component: Users,
    layout: "/admin"
  }
];

export const operatorRoutes = [
  {
    path: "/proceso",
    name: "Proceso",
    permissions: ['Operario'],
    icon: BuildIcon,
    component: ProcessView,
    layout: "/operario"
  },
]