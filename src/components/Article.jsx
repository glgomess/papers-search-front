import React from "react";
import "./article.scss";

export default function Article({ article }) {
	return (
		<div className="article-container">
			<span className="article-title">{article.title}</span>
			<div className="article-subtopic">
				<span className="article-subtitle">Abastract: </span>
				<span className="article-subtitle-text">{article.abstract}</span>
			</div>
			<div className="article-subtopic">
				<span className="article-subtitle">Authors: </span>
				<span className="article-subtitle-text">{article.authors}</span>
			</div>
			<div className="article-subtopic">
				<span className="article-subtitle">Keywords: </span>
				<span className="article-subtitle-text">{article.keywords}</span>
			</div>
		</div>
	);
}
