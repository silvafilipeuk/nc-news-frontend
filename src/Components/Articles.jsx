import styled from "styled-components";
import ArticleCard from "./ReusableComponents/ArticleCard";
import getArticles from "../utils/getArticles";
import LoadMoreButton from "./ReusableComponents/LoadMoreButton";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import sizes from "../utils/breakPoints";
import ErrorPage from "./ErrorPage";
import Loading from "./ReusableComponents/Loading";

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-areas:
		"sortby"
		"articles";
`;

const ArticlesList = styled.div`
	display: grid;
	grid-area: articles;
	justify-self: center;
`;

const SortBy = styled.div`
	grid-area: sortby;
	display: grid;
	grid-template-columns: 1fr 1fr;
`;
const SortBySelect = styled.select`
	justify-self: left;
	background-image: linear-gradient(#696969, #696969),
		linear-gradient(#bfbfbf, #bfbfbf);
	border: 0 none;
	border-radius: 0;
	box-shadow: none;
	float: none;
	background-color: transparent;
	background-position: center bottom, center calc(100% - 1px);
	background-repeat: no-repeat;
	background-size: 0 0, 100% 0;
	padding: 0;
	color: #696969;
	min-height: 35px;
	display: initial;
	width: 60%;
	outline: none;
	font-size: 15px;

	@media ${sizes.md} {
		width: 30%;
	}
`;

const OrderSelect = styled.select`
	justify-self: right;
	background-image: linear-gradient(#696969, #696969),
		linear-gradient(#bfbfbf, #bfbfbf);
	border: 0 none;
	border-radius: 0;
	box-shadow: none;
	float: none;
	background-color: transparent;
	background-position: center bottom, center calc(100% - 1px);
	background-repeat: no-repeat;
	background-size: 0 0, 100% 0;
	padding: 0;
	color: #696969;
	min-height: 35px;
	display: initial;
	width: 65%;
	outline: none;
	font-size: 15px;

	@media ${sizes.md} {
		width: 30%;
	}
`;

function Articles({ search, error, setError }) {
	const [articles, setArticles] = useState([]);
	const [limit, setLimit] = useState(10);
	const [totalArticles, setTotalArticles] = useState(0);
	const [loadedArticles, setloadedArticles] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);

	const topicQuery = searchParams.get("topic");
	const orderQuery = searchParams.get("order") || "asc";
	const SortByQuery = searchParams.get("sort_by") || "created_at";

	const searchedArticles = () => {
		let searchList = [...articles];

		if (search.length) {
			searchList = articles.filter((article) =>
				article.title.toLowerCase().includes(search.toLowerCase())
			);
		}

		return searchList;
	};

	function handleLoadMore() {
		setLimit(limit + 10);
	}

	const setSortOrder = (direction) => {
		const newParams = new URLSearchParams(searchParams);

		newParams.set("order", direction);
		setSearchParams(newParams);
	};

	const setSortBy = (sortBy) => {
		const newParams = new URLSearchParams(searchParams);

		newParams.set("sort_by", sortBy);
		setSearchParams(newParams);
	};

	useEffect(() => {
		setIsLoading(true);

		getArticles(limit, 1, topicQuery, orderQuery, SortByQuery)
			.then((response) => {
				setArticles(response.articles);
				setTotalArticles(response.total_count);
				setloadedArticles(response.articles.length);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	}, [limit, topicQuery, orderQuery, SortByQuery, setError]);

	if (error) return <ErrorPage errorCode={error.status} msg={error.msg} />;

	return isLoading ? (
		<Loading />
	) : (
		<Container>
			<SortBy>
				<SortBySelect onChange={(e) => setSortBy(e.target.value)}>
					<option key="default" value="created_at">
						Sort By
					</option>
					<option key="created_at" value="created_at">
						Date
					</option>
					<option key="votes" value="votes">
						Votes
					</option>
					<option key="title" value="title">
						Title
					</option>
					<option key="topic" value="topic">
						Topic
					</option>
					<option key="author" value="author">
						Author
					</option>
				</SortBySelect>
				<OrderSelect onChange={(e) => setSortOrder(e.target.value)}>
					<option defaultValue key="asc" value="asc">
						Ascending
					</option>
					<option key="desc" value="desc">
						Descending
					</option>
				</OrderSelect>
			</SortBy>
			<ArticlesList>
				{searchedArticles().map((article) => (
					<ArticleCard key={article.article_id} article={article} />
				))}

				{loadedArticles < totalArticles ? (
					<LoadMoreButton handleLoadMore={handleLoadMore} />
				) : (
					""
				)}
			</ArticlesList>
		</Container>
	);
}

export default Articles;
