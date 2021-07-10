import React, { useState, useEffect, useCallback } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { storeBaseplans } from 'redux/actions'

// core components
import BasePlans from 'components/BasePlans';
import basePlanService from 'services/basePlanService';

// services

export default function BasePlansView() {
  const dispatch = useDispatch();
	const [ data, setData ] = useState();

	const updateData = useCallback(
		async () => {
			const {response} = await basePlanService.getAll();
			setData(response);
			dispatch(storeBaseplans(response))
		},
		[dispatch] 
	);

	useEffect(
		() => {
			!data && updateData();
		},
		[ data, updateData ]
	);

	return <BasePlans data={data} updateData={updateData} />;
}
