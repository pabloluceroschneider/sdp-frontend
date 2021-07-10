import React, { useRef, useCallback, useEffect } from "react";
// redux
import { useSelector, useDispatch } from 'react-redux';
import { storeCompanies } from 'redux/actions'
// project components
import Companies from "components/Companies";
import companyService from 'services/companyService';

export default function CompaniesView() {
  const updateRef = useRef();
  const companies = useSelector(state => state.appData.companies)
  const dispatch = useDispatch();

  const updateData = useCallback(
    () => {
      companyService.allCompanies().then( res => {
        dispatch(storeCompanies(res));
      })
  },[dispatch]);

	useEffect(() => {
    if (updateRef.current) return;
		updateData();
    updateRef.current = true;
	},[companies, updateData]);

  return (
    <Companies 
      companies={companies}
      updateData={updateData}
      />
  );
}
