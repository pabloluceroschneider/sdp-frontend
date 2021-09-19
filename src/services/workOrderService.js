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
		estimate: t.estimate,
	}))
	const body = {
		productId: workorder.product._id,
		basePlan: workorder.basePlan.name,
		quantity: workorder.quantity,
		observation: workorder.observation,
		assignedTo: workorder.assignedTo,
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
	let { error, loadingBtn, tableData, confirm, planName, newTasks: del, tasks: delet, ...body } = workorder
	
	Object.keys(body).filter( key => !key && delete body[key])
	body.status = body.status.id || body.status;
	body.assignedTo = body.assignedTo || "Sin Asignar";
	
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

	return await tasksService.upsert({ id, tasks })
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
