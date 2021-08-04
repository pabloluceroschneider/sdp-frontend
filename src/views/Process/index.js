import React, { useState, useEffect } from 'react';

// core components
import Process from 'components/Process';
// services 
import processService from 'services/processService';


export default function ProcessView() {
	const [data, setdata] = useState();

	useEffect(() => {
    if (data) return;
		const getData = async () => processService.getTasks().then( 
			({response}) => setdata(response));
		getData();
	},[data]);

	return <Process data={data} />
}
