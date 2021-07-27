import endpoint from 'helpers/scope';
import catchResponse from 'helpers/catchResponse';
import tasksService from './tasksService';
let workOrderService = {};

/**
 * Get all WorkOrders ~~ Formated ~~
 * @param {string} url optional - default const const endpoint = 'http://localhost:8080';
 * @returns {Array} WorkOrders
 */
workOrderService.all = async (url = endpoint) => {
	const uri = `${url}/workorders`;

	const workOrders = await fetch(uri, {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	}).then(catchResponse);
	return workOrders;
};

/**
 * Create Work Order
 * @param {Object} body { company } 
 * @returns {Promise}
 */
workOrderService.create = async ({ workorder, tasks }) => {
	const uri = `${endpoint}/workorders`;
	const bodyTasks = tasks.map( t => ({
		name: t.name,
		quantity: t.quantity,
		assignedTo: t.assignedTo,
		done: t.done,
		status: t.status,
		observation: t.observation,
	}))
	const body = {
		productId: workorder.product._id,
		basePlan: workorder.basePlan.name,
		quantity: workorder.quantity,
		observation: workorder.observation,
		purchaseOrder: workorder.purchaseOrder,
		deliveryDate: workorder.deliveryDate,
		tasks: bodyTasks
	}
	const response = await fetch(uri, {
		method: 'POST',
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

/**
 * Update Work Order
 * @param {Object} body { company } 
 * @returns {Promise}
 */
 workOrderService.update = async ({ id, workorder, tasks }) => {
	const uri = `${endpoint}/workorders/${id}`;
	const { error, loadingBtn, tableData, confirm, planName, newTasks: delet, ...body } = workorder
	body.status = body.status.id || body.status;
	
	let response = await fetch(uri, {
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

	if (response.error) return response

	let newTasks = tasks
	.filter( t => t.newTaskOrder > -1)
	if (!newTasks.length) return response

	newTasks
	.map( t => {
		const { newTaskOrder, tableData, ...restTask } = t
		return tasksService.createTask({
			workorderId: id,
			...restTask
		})
	})
	newTasks = await Promise.all(newTasks);
	newTasks = newTasks.find( r => r.error && r ) || newTasks[0]
	return newTasks;
	// return la que tiene error, o la primera (indiferente)
};

/**
 * Delete Work Order by Id
 * @param {Object} body { company } 
 * @returns {Promise}
 */
 workOrderService.delete = async ({ id }) => {
	const uri = `${endpoint}/workorders/${id}`;

	const response = await fetch(uri, {
		method: 'DELETE',
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

export default workOrderService;
