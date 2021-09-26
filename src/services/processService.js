import url from 'helpers/scope';
import catchResponse from 'helpers/catchResponse';
let processService = {};
const objectNoNullValues = body => {
	return Object.entries(body).reduce((acc, item) => {
		const [ key, value ] = item
		if (!value) return acc
		return {
			...acc,
			[key]: value
		}
	},{})
}

/**
 * 
 * getTasks
 *  
 */
processService.getTasks = async ({username}) => {
	const uri = `${url}/users/tasks/${username}`;

	const response = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	})
	.then(catchResponse)
	.catch(err => console.warn(err))

	return response;
};

/**
 * 
 * start Task
 *  
 */
 processService.updateTask = async ({ id, body }) => {
	const uri = `${url}/tasks/${id}?accumulateDone=true`;
	const response = await fetch(uri, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(objectNoNullValues(body))
	})
	.then(catchResponse)
	.catch(err => console.log(err));

	return response;
};


export default processService;
