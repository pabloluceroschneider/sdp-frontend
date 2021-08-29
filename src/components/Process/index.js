import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { saveRequest } from 'redux/actions';

import TasksTable from './TasksTable';
import Detail from './DetailProcess';

import processService from 'services/processService';

function Process({ updateDate }) {
	const [selected, setSelected] = useState();
	const dispatch = useDispatch()
	const onRowClick = useCallback((_, row) => setSelected(row),[]);
	const dispatchRequest = useCallback((request) => 
		dispatch(saveRequest(request))
	,[dispatch]);
	const onDrawerClose = useCallback(
		() => setSelected()
		,[]
	);
	const updateSelected = useCallback((id, values) =>
		processService.updateTask({
			id,
			body: values
		})
		.then(async (res) => {
			if(!res) throw Error("Offline")
			setSelected(s => ({
				done: res.response.done,
				...s,
				...res.response, 
			}));
			await updateDate();
		})
		.catch((err) => {
			if (err.message === "Offline") {
				setSelected(s => ({
					...s,
					done: values.done ? values.done : selected.done,
				}));
				const request= {
					method: 'PUT',
					endpoint: `tasks/${id}`,
					body: values
				}
				console.log(request)
				dispatchRequest({request, object: {id,values}})
			}
		})
	,[updateDate, dispatchRequest, selected]);

	return (
		<div>
			<TasksTable onRowClick={onRowClick} />
			{selected && <Detail 
			data={selected} 
			onDrawerClose={onDrawerClose} 
			updateSelected={updateSelected}
			/>}
		</div>
	);
}

export default Process;
