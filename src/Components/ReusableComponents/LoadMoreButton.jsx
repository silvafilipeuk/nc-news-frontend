import styled from "styled-components";

const Button = styled.button`
	color: #bf4f74;
	font-size: 1em;
	margin: 1em;
	padding: 0.25em 1em;
	border: 2px solid #bf4f74;
	border-radius: 3px;
	width: 150px;
	justify-self: center;
`;

function LoadMoreButton({ handleLoadMore }) {
	return <Button onClick={handleLoadMore}>Load More</Button>;
}

export default LoadMoreButton;
