import axios from "axios";

const instance = axios.create({
	baseURL: "https://nc-news-vvzg.onrender.com/api",
	timeout: 10000,
});

export default function deleteArticleComment(comment_id) {
	return instance
		.delete("/comments/" + comment_id)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			Promise.reject(err.response.data);
		});
}
