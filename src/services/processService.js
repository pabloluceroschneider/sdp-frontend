import url from 'helpers/scope';
import catchResponse from 'helpers/catchResponse';
let processService = {};

/**
 * 
 * getTasks
 *  
 */
processService.getTasks = async () => {
	const uri = `${url}/users/tasks/pablo`;

	const response = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(catchResponse);

	return response;
};

/**
 * 
 * start Task
 *  
 */
 processService.startTask = async ({ id }) => {
	const uri = `${url}/tasks/${id}`;

	const body = {startDate: new Date()};

	const response = await fetch(uri, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body)
	}).then(catchResponse);

	return response;
};


export default processService;
