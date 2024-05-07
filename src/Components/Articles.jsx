import styled from "styled-components";
import ArticleCard from "./ReusableComponents/ArticleCard";
import getArticles from "../utils/getArticles";
import LoadMoreButton from "./ReusableComponents/LoadMoreButton";
import { useEffect, useState } from "react";

const Container = styled.div`
	display: grid;
`;

function Articles() {
	const [articles, setArticles] = useState([]);
	const [limit, setLimit] = useState(10);
	const [totalArticles, setTotalArticles] = useState(0);
	const [loadedArticles, setloadedArticles] = useState(0);

	function handleLoadMore() {
		setLimit(limit * 2);
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
				<ArticleCard key={article.article_id} article={article} />
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
