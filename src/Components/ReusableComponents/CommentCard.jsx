import styled from "styled-components";
import sizes from "../../utils/breakPoints";
import formatCourseDate from "../../utils/utils";

const CommentBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 300px;
	padding: 10px;
	margin: 10px 0 0 0;
	grid-template-areas:
		"creation_date author"
		"body body"
		"votes votes";
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	@media ${sizes.md} {
		width: 700px;
	}
`;

const CreationDate = styled.div`
	grid-area: creation_date;
	justify-self: start;
	padding: 5px 0px 5px 5px;
`;

const Author = styled.div`
	grid-area: author;
	justify-self: end;
	padding: 5px 5px 5px 0px;
`;

const Body = styled.div`
	grid-area: body;
	padding: 5px 5px 15px 5px;
`;

const Votes = styled.div`
	grid-area: votes;
	justify-self: start;
	padding: 5px 0px 5px 5px;
`;

function CommentCard({ comment }) {
	const date = formatCourseDate(comment.created_at.split("T")[0]);
	const hour = comment.created_at.split("T")[1].slice(0, 5);
	return (
		<CommentBox>
			<CreationDate>
				<strong>Date:</strong> {date + " - " + hour}
			</CreationDate>
			<Author>
				<strong>Author:</strong> {comment.author}
			</Author>
			<Body>{comment.body}</Body>
			<Votes>
				<strong>Votes:</strong> {comment.votes}
			</Votes>
		</CommentBox>
	);
}

export default CommentCard;
