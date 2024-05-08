import styled from "styled-components";

const Button = styled.button`
	font-size: 1em;
	margin: 0 0 1em 1em;
	padding: 0.25em 1em;
	border-radius: 3px;
	color: #bf4f74;
	border: 2px solid #bf4f74;
	cursor: pointer;
`;

function VoteDownButton({ voteChange, handleArticleDownVote }) {
	return (
		<Button
			disabled={voteChange === -1}
			onClick={handleArticleDownVote}
			type="button"
		>
			Down
		</Button>
	);
}

export default VoteDownButton;
