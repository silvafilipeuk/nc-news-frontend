import axios from "axios";

const instance = axios.create({
	baseURL: "https://nc-news-vvzg.onrender.com/api",
	timeout: 20000,
});

export default function getArticles(limit = 10, p = 1) {
	const params = { limit: limit, p: p };

	return instance
		.get("/articles", { params })
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function getArticleById(article_id) {
	const params = article_id;

	return instance
		.get("/articles/" + params)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
		});
}
