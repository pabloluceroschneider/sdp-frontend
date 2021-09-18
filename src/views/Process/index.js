import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeProcess, bulkFailedRequests } from 'redux/actions'

//@material-ui
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

// core components
import Process from 'components/Process';

// services 
import processService from 'services/processService';
import syncService from 'services/syncService';

/**
 * ProcessView
 */
export default function ProcessView() {
	const username = useSelector(state => state.auth.token.username);
	const requests = useSelector(state => state.process.requests);
	const [pendings, setpendings] = useState([]);
  const dispatch = useDispatch();
	const dispatchFailedRequests = (request) => dispatch(bulkFailedRequests(request))
	const dispatchProcess = useCallback((response) => 
		dispatch(storeProcess(response))
	,[dispatch])
	useEffect(() => {
		if (!requests) return 
		const r = Object.entries(requests);
		setpendings(r);
	}, [requests])


	useEffect(() => {
		const getData = async () => 
		processService.getTasks({username})
			.then(({response}) => dispatchProcess(response))
			.catch(() => console.log("offline mode"))
		getData();
	},[username, dispatchProcess]);

	const updateData = useCallback( 
		async () => processService.getTasks({username})
		.then(({response}) => dispatchProcess(response))
		.catch(() => console.log("err"))
		,[username, dispatchProcess]);
	
	const syncData = () => {
		console.log(`pendings`, pendings)
		let fetched = [];
		let failed = []
		const promiseRequest = pendings.map( request => {
			console.log(`request`, request)
			const [ id, body ] = request;
			return syncService.update({id, body})
				.then(() => fetched.push(request))
				.catch(() => failed.push(request))
		})
		Promise.all(promiseRequest).then( async ()=> {
			await dispatchFailedRequests(failed);
			await updateData();
		})
	}

	return (
		<>
			{Boolean(pendings.length) && <Alert
						severity="warning"
						style={{marginBottom:12}}
						children={`Hay ${pendings.length} ${requests.length > 1 ? "tareas" : "tarea"} sin guardar`}
						action={
							<Button onClick={syncData} color="inherit" size="small">
								Sincronizar
							</Button>
						}
					/>}
			<Process updateData={updateData} />
		</>
	)
}
