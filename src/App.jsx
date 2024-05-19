import Articles from "./Components/Articles";
import Header from "./Components/Header";
import ArticlesById from "./Components/ArticlesById";
import MainContent from "./Components/MainContent";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UsersContext";
import Login from "./Components/Login";
import { AlertMessagesProvider } from "./contexts/AlertMessagesContext";
import Topics from "./Components/Topics";
import ErrorPage from "./Components/ErrorPage";
import { useState } from "react";

function App() {
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");

	return (
		<AlertMessagesProvider>
			<UserProvider>
				<MainContent>
					<Header setSearch={setSearch} />
					<Routes>
						<Route
							path="/"
							element={
								<Articles
									search={search}
									error={error}
									setError={setError}
								/>
							}
						/>
						<Route
							path="/articles"
							element={
								<Articles
									search={search}
									error={error}
									setError={setError}
								/>
							}
						/>
						<Route
							path="/articles/:article_id"
							element={
								<ArticlesById
									search={search}
									error={error}
									setError={setError}
								/>
							}
						/>
						<Route
							path="/login"
							element={
								<Login error={error} setError={setError} />
							}
						/>
						<Route path="/topics" element={<Topics />} />
						<Route path="*" element={<ErrorPage />} />
					</Routes>
				</MainContent>
			</UserProvider>
		</AlertMessagesProvider>
	);
}

export default App;
