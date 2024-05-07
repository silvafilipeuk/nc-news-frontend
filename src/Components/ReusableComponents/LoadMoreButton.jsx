import styled from "styled-components";

const Button = styled.button``;

function LoadMoreButton(handleLoadMore) {
	console.log(handleLoadMore);
	return <Button onClick={handleLoadMore}>Load More</Button>;
}

export default LoadMoreButton;
