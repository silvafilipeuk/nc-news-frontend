import Articles from "./Components/Articles";
import Header from "./Components/Header";
import ArticlesById from "./Components/ArticlesById";
import MainContent from "./Components/MainContent";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UsersContext";
import Login from "./Components/Login";
import { AlertMessagesProvider } from "./contexts/AlertMessagesContext";

function App() {
	return (
		<AlertMessagesProvider>
			<UserProvider>
				<MainContent>
					<Header />
					<Routes>
						<Route path="/" element={<Articles />} />
						<Route path="/articles" element={<Articles />} />
						<Route
							path="/articles/:article_id"
							element={<ArticlesById />}
						/>
						<Route path="/login" element={<Login />} />
					</Routes>
				</MainContent>
			</UserProvider>
		</AlertMessagesProvider>
	);
}

export default App;
