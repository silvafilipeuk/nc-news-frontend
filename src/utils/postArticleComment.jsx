import axios from "axios";

const instance = axios.create({
	baseURL: "https://nc-news-vvzg.onrender.com/api",
	timeout: 10000,
});

export default function postArticleComment(article_id, user, commentBody) {
	const body = {
		username: user,
		body: commentBody,
	};

	return instance
		.post("/articles/" + article_id + "/comments", body)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return Promise.reject(err.response.data);
		});
}
