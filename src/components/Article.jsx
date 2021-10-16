import React from "react";
import "./article.scss";

export default function Article({ article }) {
	return (
		<div className="article-container">
			<span className="article-title">{article.bookTitle}</span>
			<div className="article-subtopic">
				<span className="article-subtitle">Abastract: </span>
				<span className="article-subtitle-text">{article.abstract}</span>
			</div>
			<div className="article-subtopic">
				<span className="article-subtitle">Authors: </span>
				<span className="article-subtitle-text">
					{article.authors.map((kw, index) =>
						index + 1 === article.authors.length ? `${kw}` : `${kw}, `
					)}
				</span>
			</div>
			<div className="article-subtopic">
				<span className="article-subtitle">Keywords: </span>
				<span className="article-subtitle-text">
					{article.keywords.map((kw) => `${kw}, `)}
				</span>
			</div>
		</div>
	);
}
