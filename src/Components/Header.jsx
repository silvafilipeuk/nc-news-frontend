import { Link } from "react-router-dom";

function Header() {
	return (
		<Link
			style={{ textDecoration: "none", color: "inherit" }}
			to={"/articles/"}
		>
			<h1>Home</h1>
		</Link>
	);
}

export default Header;
