import React from "react";
import ReactDOM from "react-dom";
import { Modal } from "carbon-components-react";
import Article from "../Article/Article";
import "./readingList.scss";

export default function ReadingList({
	articles,
	openReadingList,
	removeFromReadingList,
	onCloseReadingList,
}) {
	return ReactDOM.createPortal(
		<Modal
			modalHeading="Reading List"
			className="reading-list"
			passiveModal
			open={openReadingList}
			onRequestClose={onCloseReadingList}
			size="lg"
		>
			<>
				{articles.length > 0 ? (
					articles.map((art) => (
						<Article
							article={art}
							isInReadingList
							removeFromReadingList={removeFromReadingList}
						/>
					))
				) : (
					<span className="empty-list">
						No articles currently in your list.
					</span>
				)}
			</>
		</Modal>,
		// eslint-disable-next-line no-undef
		document.body
	);
}
