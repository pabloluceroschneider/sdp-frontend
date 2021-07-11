import { SET_USERS, SET_COMPANIES, SET_PRODUCTS, SET_BASEPLANS } from "../actionTypes";

const initialState = {
  companies: [],
  products: [],
  optionscompanies: {},
  optionsproducts: {},
  lookupproducts: {},
  users: [],
  status: [
    { id: "NOT_STARTED",         name: "No comenazada"       },
    { id: "IN_PROGRESS",         name: "En progreso"         },
    { id: "PAUSED",              name: "Pausada"             },
    { id: "CANCELLED",           name: "Cancelada"           },
    { id: "FINISHED",            name: "Terminada"           },
    { id: "FINISHED_WITH_ERROR", name: "Terminada con error" },
  ],
  
  lookupcompanies: {},
  lookupusers: {
    'Sin asignar':'Sin asignar'
  },
  optionsusers: [],
  lookupstatus: { 
    NOT_STARTED         : 'No comenzada', 
    IN_PROGRESS         : 'En progreso',
    PAUSED              : 'Pausada',
    CANCELLED           : 'Cancelada',
    FINISHED            : 'Terminada',
    FINISHED_WITH_ERROR : 'Terminada con error',
  },
  optionsbaseplans: {},
};

export default function(state = initialState, action) {
  switch (action.type) {


    case SET_USERS: {
      return {
        ...state,
        users: action.payload,
        optionsusers: action.payload.reduce((acc, item) => ({...acc, [item._id]: item}),{}),
        lookupusers: action.payload.reduce((acc, item) => ({...acc, [item.username]: item.username}), {
          'Sin asignar':'Sin asignar'
        }),
      };
    }


    case SET_COMPANIES: {
      return {
        ...state,
        companies: action.payload.map( ({_id, name}) => ({ _id, name })),
        lookupcompanies: action.payload.reduce((acc, item) => ({...acc, [item.name]: item.name}),{}),
        optionscompanies: action.payload.reduce((acc, item) => ({...acc, [item._id]: item}),{})
      };
    }


    case SET_PRODUCTS: {
      return {
        ...state,
        products: action.payload.map( item => item ),
        lookupproducts: action.payload.reduce((acc, item) => ({...acc, [item.name]: item.name}),{}),
        optionsproducts: action.payload.reduce((acc, item) => {
          const p = acc[item.companyId] || [];
          return {...acc, 
            [item.companyId]: [...p, item]
          }
        },{})
      };
    }

    case SET_BASEPLANS: {
      return {
        ...state,
        optionsbaseplans: action.payload.reduce((acc, item) => {
          const p = acc[item.productId] || [];
          return {...acc, 
            [item.productId]: [...p, item]
          }
        },{})
      };
    }


    default:
      return state;
  }
}
