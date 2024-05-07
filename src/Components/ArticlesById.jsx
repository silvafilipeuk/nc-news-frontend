import { useParams } from "react-router-dom";
import styled from "styled-components";
import ArticleCard from "./ReusableComponents/ArticleCard";
import { getArticleById } from "../utils/getArticles";
import { useEffect, useState } from "react";

const Container = styled.div`
	display: grid;
`;

function ArticlesById() {
	const [article, setArticle] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { article_id } = useParams();

	useEffect(() => {
		Promise.all([getArticleById(article_id)]).then((response) => {
			setArticle(response[0].article);
			setIsLoading(false);
		});
	}, []);

	return isLoading ? (
		"Loading"
	) : (
		<Container>{<ArticleCard article={article} />}</Container>
	);
}

export default ArticlesById;
