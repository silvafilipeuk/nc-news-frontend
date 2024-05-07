import axios from "axios";

const instance = axios.create({
	baseURL: "https://nc-news-vvzg.onrender.com/api",
	timeout: 10000,
});

export default function getComments(article_id) {
	const params = article_id;

	return instance
		.get("/articles/" + params + "/comments")
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			console.log(err);
		});
}
