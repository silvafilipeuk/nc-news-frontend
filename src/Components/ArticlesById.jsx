import { useParams } from "react-router-dom";
import styled from "styled-components";
import ArticleCard from "./ReusableComponents/ArticleCard";
import { getArticleById } from "../utils/getArticles";
import { useEffect, useState } from "react";
import getComments from "../utils/getComments";
import CommentCard from "./ReusableComponents/CommentCard";
import PostCommentCard from "./PostComment";
import ErrorPage from "./ErrorPage";

const Container = styled.div`
	display: grid;
`;

const CommentsBox = styled.div`
	display: grid;
	justify-self: start;
	margin: 10px;
	padding: 5px;
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-style: normal;
	color: teal;
`;

const NoCommentsBox = styled.div`
	display: grid;
	justify-self: start;
	margin: 10px;
	padding: 5px;
	font-family: "Roboto", sans-serif;
	font-weight: 400;
	font-style: normal;
`;

function ArticlesById({ error, setError }) {
	const [article, setArticle] = useState([]);
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { article_id } = useParams();

	useEffect(() => {
		Promise.all([getArticleById(article_id), getComments(article_id)])
			.then((response) => {
				setArticle(response[0].article);
				setComments(response[1].comments);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
			});
	}, [article_id, comments, setError]);

	if (error) return <ErrorPage errorCode={error.status} msg={error.msg} />;

	return isLoading ? (
		"Loading"
	) : (
		<Container>
			<ArticleCard article={article} />
			{comments.length > 0 ? (
				<>
					<CommentsBox>Comments:</CommentsBox>
					<PostCommentCard article={article}></PostCommentCard>
				</>
			) : (
				<>
					<NoCommentsBox>
						There are no comments yet. You could be the first to
						share your thoughts!
					</NoCommentsBox>
					<PostCommentCard></PostCommentCard>
				</>
			)}
			{comments.map((comment) => {
				return (
					<CommentCard key={comment.comment_id} comment={comment} />
				);
			})}
		</Container>
	);
}

export default ArticlesById;
