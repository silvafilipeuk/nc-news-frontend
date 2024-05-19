import styled from "styled-components";
import sizes from "../utils/breakPoints";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UsersContext";
import Topics from "./Topics";

const HeaderContainer = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-areas:
		"logo searchbar users"
		"topics topics topics";
	width: 90%;
	font-size: 1em;
	border: 0 none;
	border-radius: 0;
	box-shadow: none;
	float: none;

	padding: 1em 1em 0 1em;

	@media ${sizes.sm} {
		width: 550px;
		font-size: 2em;
	}

	@media ${sizes.md} {
		width: 850px;
		grid-template-columns: 0.5fr 1.5fr 0.5fr;
		font-size: 2em;
	}

	@media ${sizes.lg} {
		width: 1150px;
	}

	@media ${sizes.xl} {
		width: 1500px;
	}
`;

const Logo = styled(Link)`
	grid-area: logo;
	justify-self: left;
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-style: normal;
	color: #c4170c;
	text-decoration: none;
`;

const SearchBar = styled.input`
	grid-area: searchbar;
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

const Users = styled(Link)`
	grid-area: users;
	justify-self: right;
	font-size: 0.5em;
	color: #696969;
	text-decoration: none;
`;

const Topic = styled.div`
	grid-area: topics;
	justify-self: center;
	font-size: 0.675em;
	text-decoration: none;
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-style: normal;
`;

function Header({ setSearch }) {
	const { loggedUser } = useContext(UserContext);

	const handleSearch = (e) => {
		e.preventDefault();
		setSearch(e.target[0].value);
	};

	return (
		<HeaderContainer>
			<Logo to={"/"}>NCnews</Logo>
			<form onSubmit={handleSearch}>
				<SearchBar type="text" placeholder="Search..."></SearchBar>
			</form>
			<Users to={"/login"}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
					<circle cx="12" cy="7" r="4"></circle>
				</svg>
				{loggedUser}
			</Users>
			<Topic>
				<Topics></Topics>
			</Topic>
		</HeaderContainer>
	);
}

export default Header;
