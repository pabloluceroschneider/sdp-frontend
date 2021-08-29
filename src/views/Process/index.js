import React, { useEffect, useCallback } from 'react';
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
  const dispatch = useDispatch();
	const dispatchFailedRequests = (request) => dispatch(bulkFailedRequests(request))
	const dispatchProcess = useCallback((response) => 
		dispatch(storeProcess(response))
	,[dispatch])

	useEffect(() => {
		const getData = async () => 
		processService.getTasks({username})
			.then(({response}) => dispatchProcess(response))
			.catch(() => console.log("offline mode"))
		getData();
	},[username, dispatchProcess]);

	const updateDate = useCallback( 
		async () => processService.getTasks({username})
		.then(({response}) => dispatchProcess(response))
		.catch(() => console.log("err"))
		,[username, dispatchProcess]);
	
	const syncData = () => {
		let fetched = [];
		let failed = []
		const promiseRequest = requests.map( request => {
			return syncService.update(request)
				.then(() => fetched.push(request))
				.catch(() => failed.push(request))
		})
		Promise.all(promiseRequest).then( async ()=> {
			await dispatchFailedRequests(failed);
			await updateDate();
		})
	}

	return (
		<>
			{Boolean(requests?.length) && <Alert
						severity="warning"
						style={{marginBottom:12}}
						children={`Hay ${requests.length} ${requests.length > 1 ? "acciones" : "acción"} sin guardar`}
						action={
							<Button onClick={syncData} color="inherit" size="small">
								Sincronizar
							</Button>
						}
					/>}
			<Process updateDate={updateDate} />
		</>
	)
}
