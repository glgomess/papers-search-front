import React, { useState, useEffect } from "react";
import {
	Row,
	Column,
	Tile,
	TextInput,
	Tag,
	Button,
	ButtonSkeleton,
	InlineNotification,
} from "carbon-components-react";
import { Search32 } from "@carbon/icons-react";
import { Suggestions } from "../../components/index";
import "./articles-filter.scss";
// eslint-disable-next-line import/no-named-as-default
import useSearch from "./hooks/useSearch";

const exampleArticle = {
	authors: ["Piccolo, Lara Schibelsky Godoy", "Baranauskas, Maria Cecília C."],
	bookTitle:
		"Proceedings of VII Brazilian Symposium on Human Factors in Computing Systems",
	abstract:
		"Taking in account the social relevance of the terrestrial TV in Brazil and the transition to the digital technology - meaning new opportunities for exploring interactivity on TV - this paper is a worldwide review of HCI studies applied to interactive TV. Organizational semiotics artifacts are used in order to identify the main questions related to the interactive TV in the Brazil scene. The main design challenges are also pointed out by this study.",
	keywords: ["human computer interaction", "digital interactive tv"],
};

export default function ArticlesFilter({
	updateArticleList,
	updateIsSearching,
}) {
	const [filters, setFilters] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [isSearchingArticles, setIsSearchingArticles] = useState(false);
	const [shouldRenderWarningMessage, setShouldRenderWarningMessage] =
		useState(false);

	const { searchKeywords } = useSearch();

	async function fetchSuggestions(word) {
		const a = await searchKeywords(word);

		setSuggestions(a);
	}

	function onSelectKeywordSuggested(word) {
		if (!filters.includes(word)) {
			setFilters([...filters, word]);
		}
	}

	function onRemoveKeyword(word) {
		const allFilters = [...filters];
		setFilters(allFilters.filter((selectedFilter) => selectedFilter !== word));
	}

	function onSearchArticles() {
		if (filters.length > 0) {
			setShouldRenderWarningMessage(false);
			setIsSearchingArticles(true);
			updateIsSearching(true);
			updateArticleList([]);
			setTimeout(() => {
				updateArticleList([exampleArticle]);
				setIsSearchingArticles(false);
				updateIsSearching(false);
			}, 2000);
		} else {
			setShouldRenderWarningMessage(true);
		}
	}

	useEffect(() => {
		// Fetch new articles
	}, [filters]);

	return (
		<Tile>
			<Column>
				<Row>
					<Column>Filters</Column>
				</Row>

				<Row className="row">
					<Column>
						<TextInput
							onChange={(e) => fetchSuggestions(e.target.value)}
							placeholder="Type in a keyword to filter articles."
						/>
					</Column>
				</Row>
				<Row>
					<Column>
						<Suggestions
							suggestions={suggestions}
							addSuggestion={onSelectKeywordSuggested}
						/>
					</Column>
				</Row>
				<Row className="row">
					<Column>
						{filters.map((filter) => (
							<Tag
								type="cool-gray"
								title={filter}
								filter
								onClose={() => onRemoveKeyword(filter)}
							>
								{" "}
								{filter}
							</Tag>
						))}
					</Column>
				</Row>
				<Row className="row">
					<Column>
						{isSearchingArticles ? (
							<ButtonSkeleton />
						) : (
							<Button renderIcon={Search32} onClick={onSearchArticles}>
								Find Articles
							</Button>
						)}

						{shouldRenderWarningMessage ? (
							<InlineNotification
								kind="info"
								iconDescription="describes the close button"
								subtitle={
									<span>Please select at least one keyword to search for.</span>
								}
								onCloseButtonClick={() => setShouldRenderWarningMessage(false)}
								title="Warning"
							/>
						) : null}
					</Column>
				</Row>
			</Column>
		</Tile>
	);
}
