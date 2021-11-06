import React from "react";
import { Grid, Row, Column } from "carbon-components-react";
import { Add32, View32 } from "@carbon/icons-react";
import dotenv from "dotenv";
import "./article.scss";

dotenv.config();

export default function Article({ article }) {
	async function redirectToDOI(doi) {
		const url = `${process.env.REACT_APP_DEFAULT_DOI_URL}/${doi}`;
		// eslint-disable-next-line no-undef
		window.open(url, "_blank").focus();
	}

	return (
		<div className="article-container">
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
							<Add32 className="action-icon" />
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
