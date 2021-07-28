import {
  BULK_CONFIGS_APP,
  SET_USERS,
  SET_COMPANIES,
  SET_PRODUCTS,
  SET_BASEPLANS
} from "../actionTypes";

const initialState = {
  companies: [],
  products: [],
  optionscompanies: null,
  optionsproducts: null,
  lookupproducts: null,
  users: [],
  status: [
    { id: "NOT_STARTED",         name: "No comenazada"       },
    { id: "IN_PROGRESS",         name: "En progreso"         },
    { id: "PAUSED",              name: "Pausada"             },
    { id: "CANCELLED",           name: "Cancelada"           },
    { id: "FINISHED",            name: "Terminada"           },
    { id: "FINISHED_WITH_ERROR", name: "Terminada con error" },
  ],
  
  lookupcompanies: null,
  lookupusers: {
    'Sin asignar':'Sin asignar'
  },
  optionsusers: null,
  lookupstatus: { 
    NOT_STARTED         : 'No comenzada', 
    IN_PROGRESS         : 'En progreso',
    PAUSED              : 'Pausada',
    CANCELLED           : 'Cancelada',
    FINISHED            : 'Terminada',
    FINISHED_WITH_ERROR : 'Terminada con error',
  },
  optionsbaseplans: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BULK_CONFIGS_APP: {
      return {
        ...state,
        status: action.payload.status,
        optionsusers: action.payload.status.reduce((acc, item) => ({...acc, [item._id]: item}),{}),
        lookupusers: action.payload.status.reduce((acc, item) => ({...acc, [item.username]: item.username}), {
          'Sin asignar':'Sin asignar'
        }),

        permissions: action.payload.permissions,
        
        users: action.payload.users,
        
        
        companies: action.payload.companies,
        lookupcompanies: action.payload.companies.reduce((acc, item) => ({...acc, [item.name]: item.name}),{}),
        optionscompanies: action.payload.companies.reduce((acc, item) => ({...acc, [item._id]: item}),{}),

        products: action.payload.products.map( item => item ),
        lookupproducts: action.payload.products.reduce((acc, item) => ({...acc, [item.name]: item.name}),{}),
        optionsproducts: action.payload.products.reduce((acc, item) => {
          const p = acc[item.companyId] || [];
          return {...acc, 
            [item.companyId]: [...p, item]
          }
        },{}),

        baseplans: action.payload.baseplans,
        optionsbaseplans: action.payload.baseplans.reduce((acc, item) => {
          const p = acc[item.productId] || [];
          return {...acc, 
            [item.productId]: [...p, item]
          }
        },{}),
      }
    }

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
        },{}),
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
