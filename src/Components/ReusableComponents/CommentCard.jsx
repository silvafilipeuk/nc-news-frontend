import styled from "styled-components";
import sizes from "../../utils/breakPoints";
import formatCourseDate from "../../utils/utils";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { UserContext } from "../../contexts/UsersContext";
import { useContext, useState } from "react";
import { AlertMessagesContext } from "../../contexts/AlertMessagesContext";
import AlertMsg from "./AlertMsg";
import deleteArticleComment from "../../utils/deleteArticleComment";

const CommentBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	width: 300px;
	padding: 10px;
	margin: 10px 0 0 0;
	grid-template-areas:
		"creation_date author"
		"body body"
		"votes delete";
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
	padding: 5px 0 5px 5px;
`;

const Delete = styled.button`
	grid-area: delete;
	justify-self: end;
	padding: 5px 0 5px 5px;
	background-color: inherit;
	color: teal;
	border: none;
`;

function CommentCard({ comment }) {
	const { loggedUser } = useContext(UserContext);

	const [deletedId, setDeletedId] = useState("");

	const {
		showAlertMessage,
		setShowAlertMessage,
		alertMessage,
		setAlertMessage,
		alertMessageStatus,
		setAlertMessageStatus,
	} = useContext(AlertMessagesContext);

	const date = formatCourseDate(comment.created_at.split("T")[0]);
	const hour = comment.created_at.split("T")[1].slice(0, 5);

	const handleCommentDelete = () => {
		setDeletedId(comment.comment_id);
		setAlertMessageStatus("info");
		setAlertMessage("We are deleting your comment, hang on!");
		setShowAlertMessage(true);

		deleteArticleComment(comment.comment_id)
			.then(() => {
				setShowAlertMessage(false);
				setAlertMessageStatus("success");
				setAlertMessage("Comment deleted succesfully!");
				setShowAlertMessage(true);
				setTimeout(() => setShowAlertMessage(false), 3000);
				setDeletedId("");
			})
			.catch(() => {
				setDeletedId("");
				setAlertMessageStatus("error");
				setAlertMessage("Something went wrong! Please try again!");
				setShowAlertMessage(true);
				setTimeout(() => setShowAlertMessage(false), 3000);
			});
	};

	return (
		<CommentBox>
			<CreationDate>
				<strong style={{ color: "teal" }}>Date:</strong>{" "}
				{date + " - " + hour}
			</CreationDate>
			<Author>
				<strong style={{ color: "teal" }}>Author:</strong>{" "}
				{comment.author}
			</Author>
			{showAlertMessage ? (
				deletedId === comment.comment_id ? (
					<AlertMsg type={alertMessageStatus} msg={alertMessage} />
				) : (
					<Body>{comment.body}</Body>
				)
			) : (
				<Body>{comment.body}</Body>
			)}
			<Votes>
				<strong style={{ color: "teal" }}>Votes:</strong>{" "}
				{comment.votes}
			</Votes>
			<Delete>
				{loggedUser === comment.author ? (
					<DeleteForeverIcon
						onClick={handleCommentDelete}
						style={{ cursor: "pointer" }}
					/>
				) : null}
			</Delete>
		</CommentBox>
	);
}

export default CommentCard;
