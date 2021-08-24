import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeProcess } from 'redux/actions'

// core components
import Process from 'components/Process';
// services 
import processService from 'services/processService';


export default function ProcessView() {
	const username = useSelector(state => state.auth.token.username);
  const dispatch = useDispatch();
	const dispatchProcess = useCallback((response) => 
		dispatch(storeProcess(response))
	,[dispatch])

	useEffect(() => {
		const getData = async () => processService.getTasks({username}).then( 
			({response}) => dispatchProcess(response));
		getData();
	},[username, dispatchProcess]);

	const updateDate = useCallback( 
		async () => processService.getTasks({username}).then( 
			({response}) => dispatchProcess(response))
		,[]);

	return <Process updateDate={updateDate} />
}
