import styled from "styled-components";
import badNews from "../images/bad_news.png";
import sizes from "../utils/breakPoints";

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	width: 100%;
	grid-template-areas:
		"title"
		"image"
		"errorDetail";
	grid-template-columns: 1fr;
`;

const ErrorTitle = styled.div`
	grid-area: title;
	justify-self: center;
	padding: 1em;
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-style: normal;
	font-size: 1.5em;
	color: teal;
`;

const ErrorImage = styled.div`
	display: grid;
	grid-area: image;
	justify-self: center;

	img {
		justify-self: center;
		width: 70%;
	}
`;

const ErrorDetail = styled.div`
	grid-area: errorDetail;
	justify-self: center;
	padding: 1em;
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-style: normal;
	font-size: 0.875em;

	@media ${sizes.md} {
		font-size: 1.5em;
	}
`;

export default function ErrorPage({
	errorCode = 404,
	msg = "Page not found!",
}) {
	return (
		<Container>
			<ErrorTitle>Oooops, I got:</ErrorTitle>
			<ErrorImage>
				<img src={badNews} />
			</ErrorImage>
			<ErrorDetail>
				<h1>
					{errorCode} - {msg}
				</h1>
			</ErrorDetail>
		</Container>
	);
}
