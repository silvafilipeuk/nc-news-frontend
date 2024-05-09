import { useEffect, useState } from "react";
import getTopics from "../utils/getTopics";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
	display: flex;
`;

const linkColors = ["#06aa48", "#a5147d", "#ff6700", "#1e4c9a", "#fb0234"];

const Topic = styled(Link)`
	padding: 1em;
	text-decoration: none;
	font-family: "Roboto", sans-serif;
	font-weight: 700;
	font-style: normal;
`;

export default function Topics() {
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		getTopics().then((response) => {
			setTopics(response.topics);
		});
	}, []);

	return (
		<Container>
			{topics.map((topic, i) => (
				<Topic
					to={"/articles?topic=" + topic.slug}
					style={{ color: linkColors[i] }}
					key={topic.slug}
				>
					{topic.slug}
				</Topic>
			))}
		</Container>
	);
}
