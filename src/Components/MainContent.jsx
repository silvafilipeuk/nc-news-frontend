import styled from "styled-components";

const Container = styled.div`
	display: grid;
	grid-template-areas:
		"header"
		"main";
	justify-items: center;
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-style: normal;
`;

const Header = styled.div`
	grid-area: header;
`;

const Content = styled.div`
	grid-area: main;
	justify-items: center;
`;

function MainContent({ children }) {
	const [header, main] = children;

	return (
		<Container>
			<Header>{header}</Header>
			<Content>{main}</Content>
		</Container>
	);
}

export default MainContent;
