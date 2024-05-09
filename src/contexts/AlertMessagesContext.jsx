import { createContext, useState } from "react";

export const AlertMessagesContext = createContext();

export const AlertMessagesProvider = ({ children }) => {
	const [showAlertMessage, setShowAlertMessage] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertMessageStatus, setAlertMessageStatus] = useState("");

	return (
		<AlertMessagesContext.Provider
			value={{
				showAlertMessage,
				setShowAlertMessage,
				alertMessage,
				setAlertMessage,
				alertMessageStatus,
				setAlertMessageStatus,
			}}
		>
			{children}
		</AlertMessagesContext.Provider>
	);
};
