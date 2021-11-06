import React, { useState } from "react";
import { Grid, InlineNotification, Button } from "carbon-components-react";
import { Content } from "carbon-components-react/lib/components/UIShell";
import { Article, Header, ReadingList } from "../../components/index";
import ArticlesFilter from "./ArticlesFilter";
import Skeleton from "./Skeleton";

import "./home.scss";

export default function Home() {
	const [articles, setArticles] = useState([]);
	const [totalArticles, setTotalArticles] = useState(0);
	const [readingList, setReadingList] = useState([]);
	const [openReadingList, setOpenReadingList] = useState(false);
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

	function addToReadingList(article) {
		const articleDOI = article.doi;
		const alreadyPresentOnList =
			readingList.filter((art) => art.doi === articleDOI).length > 0;

		if (!alreadyPresentOnList) {
			setReadingList([...readingList, article]);
		}
	}

	function removeFromReadingList(article) {
		const articleDOI = article.doi;
		const updatedList = readingList.filter((art) => art.doi !== articleDOI);

		setReadingList(updatedList);
	}

	return (
		<>
			<Header />
			<Content>
				<Grid>
					<ReadingList
						articles={readingList}
						openReadingList={openReadingList}
						onCloseReadingList={() => setOpenReadingList(false)}
						removeFromReadingList={removeFromReadingList}
					/>
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
					<div className="row">
						<span className="found-articles">
							Total Articles Found: {totalArticles}
						</span>
						<Button kind="tertiary" onClick={() => setOpenReadingList(true)}>
							My Reading List
						</Button>
					</div>
					<div className="article-list">
						{articles.map((art) => (
							<Article article={art} addToReadingList={addToReadingList} />
						))}
					</div>
					{isSearching ? <Skeleton /> : null}
				</Grid>
			</Content>
		</>
	);
}
