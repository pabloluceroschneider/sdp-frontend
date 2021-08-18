import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// core components
import Process from 'components/Process';
// services 
import processService from 'services/processService';


export default function ProcessView() {
	const username = useSelector(state => state.auth.token.username)
	const [data, setdata] = useState();

	useEffect(() => {
    if (data) return;
		const getData = async () => processService.getTasks({username}).then( 
			({response}) => setdata(response));
		getData();
	},[data]);

	return <Process data={data} />
}
