import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { storeUsers } from 'redux/actions'
// core components
import Users from 'components/Users/index';

// services
import usersService from 'services/usersService';


export default function UsersView() {
	const users = useSelector(state => state.appData.users);
	const dispatch = useDispatch();
	const [permissions, serpermissions] = React.useState([]);

	const getData = React.useCallback(async () => {
			const _permissions = await usersService.allPermissions();
			const _users = await usersService.allUsers();
			serpermissions(_permissions)
			dispatch(storeUsers(_users))
	},[dispatch])
	
	React.useEffect(() => {
		!permissions.length && getData();
	}, [permissions.length, getData]);

	return <Users users={users} permissions={permissions} getData={getData} />
}
