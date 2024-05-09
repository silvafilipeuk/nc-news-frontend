import { createContext, useEffect, useState } from "react";
import getusers from "../utils/getUsers";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [loggedUser, setLoggedUser] = useState("Sign in");

	useEffect(() => {
		getusers()
			.then((response) => {
				setUsers(response.users);
			})
			.catch((err) => {
				setUsers("Error fetching users. ", err);
			});
	}, []);

	return (
		<UserContext.Provider value={{ users, loggedUser, setLoggedUser }}>
			{children}
		</UserContext.Provider>
	);
};
