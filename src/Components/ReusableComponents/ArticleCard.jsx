import styled from "styled-components";
import sizes from "../../utils/breakPoints";
import formatCourseDate from "../../utils/utils";

const ArticleBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 300px;
	padding: 5px;
	margin: 10px;
	grid-template-areas:
		"img img img"
		"topic creation_date author"
		"title title tile"
		"body body body"
		"votes comment_count comment_count";
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	@media ${sizes.sm} {
		width: 700px;
	}
`;

const Image = styled.img`
	grid-area: img;
	width: 300px;
	border-radius: 5px;

	@media ${sizes.sm} {
		width: 700px;
	}
`;

const Title = styled.div`
	grid-area: title;
	justify-self: start;
	padding: 5px 0px 5px 0px;
`;

const Topic = styled.div`
	grid-area: topic;
	justify-self: start;
	padding: 5px 0px 5px 0px;
`;

const CreationDate = styled.div`
	grid-area: creation_date;
	justify-self: start;
	padding: 5px 0px 5px 0px;
`;

const Author = styled.div`
	grid-area: author;
	justify-self: end;
	padding: 5px 0px 5px 0px;
`;

const Body = styled.div`
	grid-area: body;
	padding: 5px 0px 5px 0px;
`;

const Votes = styled.div`
	grid-area: votes;
	justify-self: start;
	padding: 5px 0px 5px 0px;
`;

const CommentCount = styled.div`
	grid-area: comment_count;
	justify-self: end;
	padding: 5px 0px 5px 0px;
`;

function ArticleCard({ article }) {
	const date = formatCourseDate(article.created_at.split("T")[0]);
	const hour = article.created_at.split("T")[1].slice(0, 5);
	return (
		<ArticleBox>
			<Image src={article.article_img_url} />
			<Topic>
				<strong>Topic:</strong> {article.topic}
			</Topic>
			<CreationDate>
				<strong>Date:</strong> {date + " - " + hour}
			</CreationDate>
			<Title>
				<h3>
					<strong>{article.title}</strong>
				</h3>
			</Title>
			<Author>
				<strong>Author:</strong> {article.author}
			</Author>
			<Body>{article.body}</Body>
			<Votes>
				<strong>Votes:</strong> {article.votes}
			</Votes>
			<CommentCount>
				<strong>Comments:</strong> {article.comment_count}
			</CommentCount>
		</ArticleBox>
	);
}

export default ArticleCard;
