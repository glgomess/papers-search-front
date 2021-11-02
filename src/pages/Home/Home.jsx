import React, { useState } from "react";
import { Grid, InlineNotification } from "carbon-components-react";
import { Content } from "carbon-components-react/lib/components/UIShell";
import { Article, Header } from "../../components/index";
import ArticlesFilter from "./ArticlesFilter";
import Skeleton from "./Skeleton";
import "./home.scss";

export default function Home() {
	const [articles, setArticles] = useState([]);
	const [totalArticles, setTotalArticles] = useState(0);
	const [isSearching, setIsSearching] = useState(false);
	const [shouldRenderNotification, setShouldRenderNotification] =
		useState(false);
	const [notificationData, setNotificationData] = useState({
		kind: "",
		subtitle: "",
		title: "",
	});

	function renderNotification(kind, title, subtitle) {
		setNotificationData({ kind, title, subtitle });
		setShouldRenderNotification(true);
	}

	return (
		<>
			<Header />
			<Content>
				<Grid>
					<ArticlesFilter
						updateArticleList={setArticles}
						updateIsSearching={setIsSearching}
						renderNotification={renderNotification}
						updateTotalArticles={setTotalArticles}
					/>
					{shouldRenderNotification ? (
						<InlineNotification
							kind={notificationData.kind}
							title={notificationData.title}
							subtitle={notificationData.subtitle}
							onClose={() => setShouldRenderNotification(false)}
						/>
					) : null}
					<span className="found-articles">
						Total Articles Found: {totalArticles}
					</span>
					<div className="article-list">
						{articles.map((art) => (
							<Article article={art} />
						))}
					</div>
					{isSearching ? <Skeleton /> : null}
				</Grid>
			</Content>
		</>
	);
}
