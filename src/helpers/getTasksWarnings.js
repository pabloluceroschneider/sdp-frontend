
const tarea_tareas = (value) => value > 1 ? 'tareas' : 'tarea'

const getTasksWarnings = (allTasks) => {

	const warnings = allTasks.reduce((acc, it) => {
		let newAcc = acc;

		const not_assigned = it.assignedTo === 'Sin asignar';
		if (not_assigned) {
			const value = acc.assignedTo.value + 1
			const tasks =  [...acc.assignedTo.tasks, it.name];
			newAcc.assignedTo.value = value;
			newAcc.assignedTo.tasks = tasks;
			newAcc.assignedTo.text = `Hay ${value} ${tarea_tareas(value)} sin responsable asignado.`;
			newAcc.assignedTo.detail = `${tasks.join(", ")}.`;
		}

		return { ...newAcc }

	},{ assignedTo: { value: 0, tasks: [] }, quantities: {} });

	return Object.values(warnings).filter( w => w.value);
};

export default getTasksWarnings;
