import styled from "styled-components";
import ArticleCard from "./ReusableComponents/ArticleCard";
import getArticles from "../utils/getArticles";
import LoadMoreButton from "./ReusableComponents/LoadMoreButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
	display: grid;
`;

function Articles() {
	const [articles, setArticles] = useState([]);
	const [limit, setLimit] = useState(10);
	const [totalArticles, setTotalArticles] = useState(0);
	const [loadedArticles, setloadedArticles] = useState(0);

	function handleLoadMore() {
		setLimit(limit + 10);
	}

	useEffect(() => {
		getArticles(limit).then((response) => {
			setArticles(response.articles);
			setTotalArticles(response.total_count);
			setloadedArticles(response.articles.length);
		});
	}, [limit]);

	return (
		<Container>
			{articles.map((article) => (
				<Link
					style={{ textDecoration: "none", color: "inherit" }}
					to={"/articles/" + article.article_id}
					key={article.article_id}
				>
					<ArticleCard article={article} />
				</Link>
			))}

			{loadedArticles < totalArticles ? (
				<LoadMoreButton handleLoadMore={handleLoadMore} />
			) : (
				""
			)}
		</Container>
	);
}

export default Articles;
