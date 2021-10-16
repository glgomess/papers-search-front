import React, { useState } from "react";
import { Grid } from "carbon-components-react";
import { Content } from "carbon-components-react/lib/components/UIShell";
import { Article, Header } from "../../components/index";
import ArticlesFilter from "./ArticlesFilter";
import Skeleton from "./Skeleton";
import "./home.scss";

export default function Home() {
	const [articles, setArticles] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	return (
		<>
			<Header />
			<Content>
				<Grid>
					<ArticlesFilter
						updateArticleList={setArticles}
						updateIsSearching={setIsSearching}
					/>
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
