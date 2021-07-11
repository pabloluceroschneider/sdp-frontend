import React from 'react';

// core components
import Table from 'components/Table';

export default function ProcessView() {
	return (
		<Table 
			columns={[
				{Header: 'Tarea', id: 'name', width: '50%'},
				{Header: 'Tarea', id: 'task', width: '50%'},
			]}
			data={[
				{ name: 'tarea 1', task:'tarea 1' },
				{ name: 'tarea 1', task:'tarea 1' },
				{ name: 'tarea 1', task:'tarea 1' },
				{ name: 'tarea 1', task:'tarea 1' },
				{ name: 'tarea 1', task:'tarea 1' },
				{ name: 'tarea 1', task:'tarea 1' },
			]}
			onDragAndDrop={console.log}
			/>
		);
}
