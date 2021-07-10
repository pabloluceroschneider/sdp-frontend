import { createContext, useContext } from 'react'

const BasePlanContext = createContext();

export default BasePlanContext
export function useBasePlanContext(){
  return useContext(BasePlanContext);
}