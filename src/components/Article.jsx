import React from "react";
import "./article.scss";

const exampleArticle = {
	authors: ["Piccolo, Lara Schibelsky Godoy", "Baranauskas, Maria Cecília C."],
	bookTitle:
		"Proceedings of VII Brazilian Symposium on Human Factors in Computing Systems",
	abstract:
		"Taking in account the social relevance of the terrestrial TV in Brazil and the transition to the digital technology - meaning new opportunities for exploring interactivity on TV - this paper is a worldwide review of HCI studies applied to interactive TV. Organizational semiotics artifacts are used in order to identify the main questions related to the interactive TV in the Brazil scene. The main design challenges are also pointed out by this study.",
	keywords: ["human computer interaction", "digital interactive tv"],
};
export default function Article() {
	return (
		<div className="article-container">
			<span className="article-title">{exampleArticle.bookTitle}</span>
			<div className="article-subtopic">
				<span className="article-subtitle">Abastract: </span>
				<span className="article-subtitle-text">{exampleArticle.abstract}</span>
			</div>
			<div className="article-subtopic">
				<span className="article-subtitle">Authors: </span>
				<span className="article-subtitle-text">
					{exampleArticle.authors.map((kw, index) =>
						index + 1 === exampleArticle.authors.length ? `${kw}` : `${kw}, `
					)}
				</span>
			</div>
			<div className="article-subtopic">
				<span className="article-subtitle">Keywords: </span>
				<span className="article-subtitle-text">
					{exampleArticle.keywords.map((kw) => `${kw}, `)}
				</span>
			</div>
		</div>
	);
}
