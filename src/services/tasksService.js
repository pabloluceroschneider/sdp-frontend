import endpoint from 'helpers/scope';
import catchResponse from 'helpers/catchResponse';
let tasksService = {};

/**
 * Get all tasks by an tasks Id.
 * @param {number} id tasksId.
 * @param {string} url optional - default const const endpoint = 'http://localhost:8080';
 * @returns {Array} Tasks
 */
tasksService.getbyId = async ({url = endpoint, id : taskId}) => {
	const uri = `${url}/tasks/${taskId}`;

  const tasks = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(catchResponse)

	return tasks;
}

/**
 * Create New Task
 * @param {number} id tasksId.
 * @returns {Array} Tasks
 */
tasksService.createTask = async (body) => {
	const uri = `${endpoint}/tasks`;

  const tasks = await fetch(uri, {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(body)
	}).then(catchResponse)

	return tasks;
}


/**
 * Get all tasks by an workorder Id.
 * @param {number} id workorderId.
 * @param {string} url optional - default const const endpoint = 'http://localhost:8080';
 * @returns {Array} Tasks
 */
tasksService.getTasksByWorkorderId = async ({url = endpoint, id}) => {
	const uri = `${url}/workorders/${id}/tasks`;

  const tasks = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(catchResponse)

	return tasks;
}

/**
 * Get all tasks by an username.
 */
 tasksService.getTasksByAssignedTo = async ({url = endpoint, username}) => {
	const uri = `${url}/users/tasks/${username}`;

  const tasks = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	}).then(catchResponse)

	return tasks;
}


/**
 * Update Task by Id
 * @param {number} id tasksId.
 * @returns {Array} Tasks
 */
 tasksService.update = async ({url = endpoint, id, body }) => {
	const uri = `${url}/tasks/${id}`;
	const { _id, ...restBody } = body;
  const response = await fetch(uri, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(restBody),
	}).then(catchResponse);
	return response;
}

/**
 * Update Task by Id
 * @param {number} id tasksId.
 * @returns {Array} Tasks
 */
 tasksService.upsert = async ({url = endpoint, id, tasks }) => {
	const uri = `${url}/tasks/bulk/upsert/${id}`;
  const response = await fetch(uri, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(tasks),
	}).then(catchResponse);
	return response;
}

/**
 * Update Task by Id
 * @param {number} id tasksId.
 * @returns {Array} Tasks
 */
 tasksService.updatePriority = async ({url = endpoint, body }) => {
	const uri = `${url}/tasks/priority`;
	console.log(`body`, body)
	const values = body.map( (t, index) => ({ id: t._id, priority: index + 1 }))
  const response = await fetch(uri, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(values),
	}).then(catchResponse);
	return response;
}

/**
 * Remove Task by Id
 * @param {number} id tasksId.
 * @returns {Array} Tasks
 */
tasksService.remove = async ({url = endpoint, id }) => {
	const uri = `${url}/tasks/${id}`;

  const tasks = await fetch(uri, {
		method: 'DELETE',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	})
  .then(catchResponse)

	return tasks;
}

export default tasksService;
