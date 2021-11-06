import React, { useState, useEffect } from "react";
import { Grid, Row, Column } from "carbon-components-react";
import { BookmarkAdd32, View32, Close32 } from "@carbon/icons-react";
import dotenv from "dotenv";
import "./article.scss";

dotenv.config();

export default function Article({
	article,
	addToReadingList,
	removeFromReadingList,
	isInReadingList = false,
}) {
	const [className, setClassName] = useState("");

	/**
	 * This hook is used to determine the CSS class of the outermost
	 * container, so it doesn't do any animation whithin the Modal.
	 */
	useEffect(() => {
		const cl = isInReadingList
			? "simple-article-container"
			: "article-container";
		setClassName(cl);
	});

	async function redirectToDOI(doi) {
		const url = `${process.env.REACT_APP_DEFAULT_DOI_URL}/${doi}`;
		// eslint-disable-next-line no-undef
		window.open(url, "_blank").focus();
	}

	return (
		<div className={className}>
			<span className="article-title">{article.title}</span>
			<div className="article-subtopic">
				<span className="article-subtitle">Abstract: </span>
				<span className="article-subtitle-text">{article.abstract}</span>
			</div>
			<div className="article-subtopic">
				<span className="article-subtitle">Authors: </span>
				<span className="article-subtitle-text">{article.authors}</span>
			</div>
			<div className="article-subtopic">
				<span className="article-subtitle">Keywords: </span>
				<span className="article-subtitle-text">{article.keywords}</span>
				<Grid>
					<Row>
						<Column className="actions">
							{isInReadingList ? (
								<Close32
									className="action-icon"
									onClick={() => removeFromReadingList(article)}
								/>
							) : (
								<BookmarkAdd32
									className="action-icon"
									onClick={() => addToReadingList(article)}
								/>
							)}

							<View32
								className="action-icon"
								onClick={() => redirectToDOI(article.doi)}
							/>
						</Column>
					</Row>
				</Grid>
			</div>
		</div>
	);
}
