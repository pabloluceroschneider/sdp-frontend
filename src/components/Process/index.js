import React from 'react';

import ProcessTable from './ProcessTable';
import Detail from './DetailProcess';
import useProcess from './useProcess';

function Process({ data }) {
	const { state, actions } = useProcess({ tasks: data });

	return (
		<div>
			<ProcessTable />
		</div>
	);
}

export default Process;
