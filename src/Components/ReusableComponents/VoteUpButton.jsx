import styled from "styled-components";

const Button = styled.button`
	font-size: 1em;
	margin: 0 0 1em 1em;
	padding: 0.25em 1em;
	border-radius: 3px;
	cursor: pointer;
	border: 2px solid mediumseagreen;
	color: mediumseagreen;
`;

function VoteUpButton({ voteChange, handleArticleUpVote }) {
	return (
		<Button
			disabled={voteChange === 1}
			onClick={handleArticleUpVote}
			type="button"
		>
			Up
		</Button>
	);
}

export default VoteUpButton;
