const config = {
	title: 'Tareas',

	style: {
		boxShadow: 'none',
		border: '1px solid #eaeaea'
	},
	
	localization: {
		body: {
			emptyDataSourceMessage: 'No hay planos',
			editRow: {
				saveTooltip: 'Confirmar',
				cancelTooltip: 'Cancelar',
				deleteText: '¿Desea eliminar Tarea?'
			},
		
			deleteTooltip: 'Eliminar Tarea'
		},
		toolbar: {
			searchPlaceholder: "Buscar",
			showColumnsTitle: "Ver columnas",
			showColumnsAriaLabel: "Ver columnas",
		},
		pagination: {
			labelDisplayedRows: '{from}-{to} de {count}',
			labelRowsPerPage: 'planos/pág.',
			labelRowsSelect: 'planos/pág.'
		}
	},
};

export default config;
