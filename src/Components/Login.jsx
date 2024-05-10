import styled from "styled-components";
import sizes from "../utils/breakPoints";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	display: grid;
`;

const LoginBox = styled.form`
	display: grid;
	grid-template-columns: 1fr;
	width: 300px;
	padding: 10px;
	margin: 10px 0 0 0;
	grid-template-areas:
		"userselect"
		"loginButton";
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	background-color: whitesmoke;
	@media ${sizes.md} {
		width: 700px;
	}
`;

const UsersSelect = styled.select`
	grid-area: userselect;
	justify-self: center;
	background-image: linear-gradient(#696969, #696969),
		linear-gradient(#bfbfbf, #bfbfbf);
	border: 0 none;
	border-radius: 0;
	box-shadow: none;
	float: none;
	background-color: transparent;
	background-position: center bottom, center calc(100% - 1px);
	background-repeat: no-repeat;
	background-size: 0 2px, 100% 1px;
	padding: 0;
	transition: background 0s ease-out 0s;
	color: #696969;
	min-height: 35px;
	display: initial;
	width: 100%;
	outline: none;
	font-size: 15px;
	&:focus {
		background-size: 100% 2px, 100% 1px;
		outline: 0 none;
		transition-duration: 0.3s;
		color: #696969;
	}
`;

const LoginButton = styled.button`
	grid-area: loginButton;
	font-size: 1em;
	margin: 1em 0;
	padding: 0.25em 1em;
	border-radius: 3px;
	cursor: pointer;
	width: 150px;
	border: 2px solid mediumseagreen;
	color: mediumseagreen;
	justify-self: end;
`;

export default function Login() {
	const { users } = useContext(UserContext);
	const [selectedUser, setSelectedUser] = useState("noUser");
	const { loggedUser, setLoggedUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();

		if (selectedUser === "noUser") {
			setLoggedUser("Sign in");
		} else {
			setLoggedUser(selectedUser);
			navigate("/");
		}
	};

	const handleLogout = () => {
		setLoggedUser("Sign in");
		navigate("/");
	};

	return loggedUser === "Sign in" ? (
		<Container>
			<LoginBox onSubmit={handleLogin}>
				<UsersSelect
					name="user"
					onChange={(e) => setSelectedUser(e.target.value)}
				>
					<option value="noUser">
						Please, select an user to login:
					</option>
					{users.map((user) => (
						<option key={user.username} value={user.username}>
							{user.username}
						</option>
					))}
				</UsersSelect>
				<LoginButton type="submit">Log in</LoginButton>
			</LoginBox>
		</Container>
	) : (
		<Container>
			<LoginBox>You are logged as {loggedUser}.</LoginBox>
			<LoginButton onClick={handleLogout}>Log out.</LoginButton>
		</Container>
	);
}
