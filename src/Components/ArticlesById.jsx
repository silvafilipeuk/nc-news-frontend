import { useParams } from "react-router-dom";
import styled from "styled-components";
import ArticleCard from "./ReusableComponents/ArticleCard";
import { getArticleById } from "../utils/getArticles";
import { useEffect, useState } from "react";
import getComments from "../utils/getComments";
import CommentCard from "./ReusableComponents/CommentCard";

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
`;

function ArticlesById() {
	const [article, setArticle] = useState([]);
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { article_id } = useParams();

	useEffect(() => {
		Promise.all([getArticleById(article_id), getComments(article_id)]).then(
			(response) => {
				setArticle(response[0].article);
				setComments(response[1].comments);
				setIsLoading(false);
			}
		);
	}, []);

	return isLoading ? (
		"Loading"
	) : (
		<Container>
			<ArticleCard article={article} />
			<CommentsBox>Comments:</CommentsBox>
			{comments.map((comment) => {
				return (
					<CommentCard key={comment.comment_id} comment={comment} />
				);
			})}
		</Container>
	);
}

export default ArticlesById;
