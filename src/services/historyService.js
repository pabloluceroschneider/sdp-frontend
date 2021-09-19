import url from 'helpers/scope';
import catchResponse from 'helpers/catchResponse';
const historyService = {};
/**
 * historyService
 */
historyService.getByTask = async ({ id }) => {
	const uri = `${url}/history/task/${id}`;
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
	.catch(err => { throw Error(err) })
	return response;
};

export default historyService;
