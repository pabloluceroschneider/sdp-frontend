import React from 'react';

import Table from './ProcessTable';
import Detail from './DetailProcess';
import useProcess from './useProcess';

function Process({ data }) {
	const { state, actions } = useProcess({ tasks: data });

	return (
		<div>
			<Table data={state.tasks} onRowClick={actions.onRowClick} />
			{state.selected && (
				<Detail
					data={state.selected}
					onDrawerClose={actions.onDrawerClose}
					onStatusChange={actions.onStatusChange}
					onDoneQuantityChange={actions.onDoneQuantityChange}
				/>
			)}
		</div>
	);
}

export default Process;
