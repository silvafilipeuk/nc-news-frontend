import Articles from "./Components/Articles";
import Header from "./Components/Header";
import ArticlesById from "./Components/ArticlesById";
import MainContent from "./Components/MainContent";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<MainContent>
			<Header />
			<Routes>
				<Route path="/" element={<Articles />} />
				<Route path="/articles" element={<Articles />} />
				<Route
					path="/articles/:article_id"
					element={<ArticlesById />}
				/>
			</Routes>
		</MainContent>
	);
}

export default App;
