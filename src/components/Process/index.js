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
		}).then( async ({response}) => {
			setSelected(s => ({
				done: response.done,
				...s,
				...response, 
			}));
			await updateDate();
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
