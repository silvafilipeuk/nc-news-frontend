import styled from "styled-components";
import sizes from "../../utils/breakPoints";
import formatCourseDate from "../../utils/utils";
import VoteUpButton from "./VoteUpButton";
import VoteDownButton from "./VoteDownButton";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import updateArticlesVotes from "../../utils/updateArticleVotes";
import { UserContext } from "../../contexts/UsersContext";

const ArticleBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 300px;
	padding: 10px;
	margin: 10px 0 0 0;
	grid-template-areas:
		"img img img"
		"topic creation_date author"
		"title title title"
		"body body body"
		"votes votes comment_count";
	background-color: whitesmoke;
	color: #31302d;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	z-index: 0;

	@media ${sizes.md} {
		width: 700px;
	}
`;

const VoteArticleBox = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 300px;
	padding: 10px 10px 0 10px;
	margin: 0 0 25px 0;
	grid-template-areas:
		"img img img"
		"topic creation_date author"
		"title title title"
		"body body body"
		"votes votes comment_count";
	background-color: #dad8d5;
	color: #31302d;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	@media ${sizes.md} {
		width: 700px;
	}
`;

const Image = styled.img`
	grid-area: img;
	width: 300px;
	border-radius: 5px;
	padding-bottom: 1rem;

	@media ${sizes.md} {
		width: 700px;
	}
`;

const Title = styled.div`
	grid-area: title;
	justify-self: start;
	padding: 5px 0px 5px 5px;
	color: teal;
`;

const Topic = styled.div`
	grid-area: topic;
	justify-self: start;
	padding: 5px 0px 5px 5px;
	font-size: 0.6875em;

	@media ${sizes.md} {
		font-size: 0.875em;
	}
`;

const CreationDate = styled.div`
	grid-area: creation_date;
	justify-self: start;
	padding: 5px 0px 5px 0px;
	font-size: 0.6875em;

	@media ${sizes.md} {
		font-size: 0.875em;
	}
`;

const Author = styled.div`
	grid-area: author;
	justify-self: end;
	padding: 5px 5px 5px 0px;
	font-size: 0.6875em;

	@media ${sizes.md} {
		font-size: 0.875em;
	}
`;

const Body = styled.div`
	grid-area: body;
	padding: 5px 5px 15px 5px;
	text-align: justify;
	text-justify: inter-word;
`;

const Votes = styled.div`
	grid-area: votes;
	padding: 2px 0 15px 10px;
	font-size: 0.625em;

	@media ${sizes.md} {
		font-size: 0.875em;
	}
`;

const CommentCount = styled.div`
	grid-area: comment_count;
	justify-self: end;
	padding: 5px 0 5px 0;
	font-size: 0.625em;

	@media ${sizes.md} {
		font-size: 0.875em;
	}
`;

function ArticleCard({ article }) {
	const [articleVotes, setArticleVotes] = useState(article.votes);
	const [voteChange, setVoteChange] = useState(0);
	const { loggedUser } = useContext(UserContext);

	const date = formatCourseDate(article.created_at.split("T")[0]);
	let hour = article.created_at.split("T")[1].slice(0, 5);

	const handleArticleUpVote = () => {
		setArticleVotes(articleVotes + 1);
		setVoteChange((currentVoteChange) => currentVoteChange + 1);
		updateArticlesVotes(article.article_id, 1);
	};

	const handleArticleDownVote = () => {
		setArticleVotes(articleVotes - 1);
		setVoteChange((currentVoteChange) => currentVoteChange + -1);
		updateArticlesVotes(article.article_id, -1);
	};

	return (
		<>
			<Link
				style={{
					textDecoration: "none",
					color: "inherit",
				}}
				to={"/articles/" + article.article_id}
				key={article.article_id}
			>
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
				</ArticleBox>
			</Link>
			<VoteArticleBox>
				<Votes>
					<strong>Votes:</strong> {articleVotes}
					{loggedUser === "Sign in" ? (
						""
					) : (
						<>
							<VoteUpButton
								voteChange={voteChange}
								handleArticleUpVote={handleArticleUpVote}
							/>
							<VoteDownButton
								voteChange={voteChange}
								handleArticleDownVote={handleArticleDownVote}
							/>
						</>
					)}
				</Votes>

				<CommentCount>
					<strong>Comments:</strong> {article.comment_count}
				</CommentCount>
			</VoteArticleBox>
		</>
	);
}

export default ArticleCard;
