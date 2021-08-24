import React, {useState,useCallback} from 'react';

import TasksTable from './TasksTable';
import Detail from './DetailProcess';
import processService from 'services/processService';

function Process({ updateDate }) {
	const [selected, setSelected] = useState();
	const onRowClick = useCallback((_, row) => setSelected(row),[]);
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
				console.log({
					method: 'PUT',
					endpoint: `/tasks/update/${id}`,
					body: values
				})
			}
		})
	,[updateDate]);

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
