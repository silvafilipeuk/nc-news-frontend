import axios from "axios";

const instance = axios.create({
	baseURL: "https://nc-news-vvzg.onrender.com/api",
	timeout: 10000,
});

export default function updateArticlesVotes(article_id, votes) {
	const params = article_id;
	const body = {
		inc_votes: votes,
	};

	return instance
		.patch("/articles/" + params, body)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return Promise.reject(err.response.data);
		});
}
