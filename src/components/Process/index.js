import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { saveRequest } from 'redux/actions';

import TasksTable from './TasksTable';
import Detail from './DetailProcess';

import processService from 'services/processService';

function Process({ updateData }) {
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

	const then = async (res) => {
		if(!res) throw Error("Offline")
		setSelected(s => ({
			done: res.response.done,
			...s,
			...res.response, 
		}));
		await updateData();
	};

	const catchE = (values, id) => (err) => {
		if (err.message === "Offline") {
			setSelected(s => ({
				...s,
				done: values.done ? values.done : selected.done,
			}));
			const body = {
				done: values.done ? values.done : selected.done,
				status: values.status ? values.status : selected.status,
				operatorNotes: values.operatorNotes,
			}
			dispatchRequest({ id, body })
		}
	};

	const updateSelected = (id, values) =>
		processService.updateTask({
			id,
			body: values
		})
		.then(then)
		.catch(catchE(values, id))
		.then(() => Promise.resolve({
			...selected,
			done: values.done ? values.done : selected.done,
		}));

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
