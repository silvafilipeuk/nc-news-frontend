import styled from "styled-components";
import sizes from "../utils/breakPoints";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UsersContext";
import postArticleComment from "../utils/postArticleComment";
import { AlertMessagesContext } from "../contexts/AlertMessagesContext";
import AlertMsg from "./ReusableComponents/AlertMsg";
import ErrorPage from "./ErrorPage";
import getComments from "../utils/getComments";

const CommentBox = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	width: 300px;
	padding: 10px;
	margin: 10px 0 10px 0;
	grid-template-areas:
		"newcomment"
		"addButton";
	box-shadow: rgba(0, 0, 0, 0.24) 0px 1px 4px;
	background-color: whitesmoke;
	color: #31302d;

	@media ${sizes.md} {
		width: 700px;
	}
`;

const CommentBoxForm = styled.form`
	display: grid;
	grid-template-columns: 1fr;
	width: 300px;
	padding: 10px;
	margin: 10px 0 0 0;
	grid-template-areas:
		"newcomment"
		"addButton";
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	background-color: whitesmoke;
	color: #31302d;

	@media ${sizes.md} {
		width: 700px;
	}
`;

const NewComment = styled.textarea`
	grid-area: newcomment;
	box-sizing: border-box;
	border-radius: 3px;
	padding: 10px;
	height: 100px;
	resize: none;
	border: 1px solid lightgrey;
	background-color: white;
	color: #31302d;
	width: 100%;

	&:focus {
		outline: none;
		box-shadow: 0px 0px 2px green;
	}

	@media ${sizes.md} {
		width: 700px;
	}
`;

const AddButton = styled.button`
	grid-area: addButton;
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

function PostCommentCard({ article, setComments }) {
	const { loggedUser } = useContext(UserContext);
	const {
		showAlertMessage,
		setShowAlertMessage,
		alertMessage,
		setAlertMessage,
		alertMessageStatus,
		setAlertMessageStatus,
		error,
		setError,
	} = useContext(AlertMessagesContext);
	const [commentBody, setCommentBody] = useState("");

	const placeholder = "Comment as " + loggedUser;

	const handleSubmit = (e) => {
		e.preventDefault();

		if (commentBody === "") {
			setAlertMessageStatus("error");
			setAlertMessage("You need to type a comment!");
			setShowAlertMessage(true);
			setTimeout(() => setShowAlertMessage(false), 1500);
			setCommentBody("");
		} else {
			setAlertMessageStatus("info");
			setAlertMessage("We are posting your comment, hang on!");
			setShowAlertMessage(true);
			postArticleComment(article.article_id, loggedUser, commentBody)
				.then(() => {
					setShowAlertMessage(false);
					setAlertMessageStatus("success");
					setAlertMessage("Post added succesfully!");
					setShowAlertMessage(true);
					setTimeout(() => setShowAlertMessage(false), 3000);
					setCommentBody("");
					getComments(article.article_id).then((response) => {
						setComments(response.comments);
					});
				})
				.catch((err) => {
					setAlertMessageStatus("error");
					setAlertMessage("Something went wrong! Please try again!");
					setShowAlertMessage(true);
					setTimeout(() => setShowAlertMessage(false), 3000);
					setCommentBody("");
					setError(err);
				});
		}
	};

	if (error) return <ErrorPage errorCode={error.status} msg={error.msg} />;

	return loggedUser === "Sign in" ? (
		<CommentBox style={{ color: "#c4170c" }}>
			Sign in to add a comment!
		</CommentBox>
	) : showAlertMessage ? (
		<AlertMsg type={alertMessageStatus} msg={alertMessage} />
	) : (
		<CommentBoxForm onSubmit={handleSubmit}>
			<NewComment
				placeholder={placeholder}
				value={commentBody}
				onChange={(e) => setCommentBody(e.target.value)}
			></NewComment>
			<AddButton type="submit">Add comment</AddButton>
		</CommentBoxForm>
	);
}

export default PostCommentCard;
