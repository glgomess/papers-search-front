import React, { useState } from "react";
import { Grid, InlineNotification } from "carbon-components-react";
import { Content } from "carbon-components-react/lib/components/UIShell";
import { Article, Header } from "../../components/index";
import ArticlesFilter from "./ArticlesFilter";
import Skeleton from "./Skeleton";
import "./home.scss";

export default function Home() {
	const [articles, setArticles] = useState([]);
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
					/>
					{shouldRenderNotification ? (
						<InlineNotification
							kind={notificationData.kind}
							title={notificationData.title}
							subtitle={notificationData.subtitle}
							onClose={() => setShouldRenderNotification(false)}
						/>
					) : null}
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
