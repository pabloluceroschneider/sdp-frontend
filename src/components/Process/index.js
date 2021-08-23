import React, {useState,useCallback} from 'react';

import TasksTable from './TasksTable';
import Detail from './DetailProcess';

function Process() {
	const [selected, setSelected] = useState();
	const onRowClick = useCallback((_, row) => setSelected(row),[]);
	const onDrawerClose = useCallback(() => setSelected(),[]);

	return (
		<div>
			<TasksTable onRowClick={onRowClick} />
			{selected && <Detail data={selected} onDrawerClose={onDrawerClose}/>}
		</div>
	);
}

export default Process;
