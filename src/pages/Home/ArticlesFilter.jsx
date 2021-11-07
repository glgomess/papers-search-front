import React, { useState } from "react";
import {
	Row,
	Column,
	Tile,
	TextInput,
	Tag,
	Button,
	ButtonSkeleton,
	InlineNotification,
	FormGroup,
	RadioButtonGroup,
	RadioButton,
} from "carbon-components-react";
import { Search32, Reset32 } from "@carbon/icons-react";
import { Suggestions } from "../../components/index";
import "./articles-filter.scss";
// eslint-disable-next-line import/no-named-as-default
import useSearch from "./hooks/useSearch";

export default function ArticlesFilter({
	updateArticleList,
	updateIsSearching,
	updateTotalArticles,
	renderNotification,
}) {
	const [keywordsFiltered, setKeywordsFiltered] = useState([]);
	const [authorsFiltered, setAuthorsFiltered] = useState([]);
	const [keywordsSuggestions, setKeywordsSuggestions] = useState([]);
	const [authorsSuggestions, setAuthorsSuggestions] = useState([]);
	const [matchAllKeywords, setMatchAllKeywords] = useState(true);
	const [relatedKeywords, setRelatedKeywords] = useState([]);
	const [isSearchingArticles, setIsSearchingArticles] = useState(false);
	const [shouldRenderWarningMessage, setShouldRenderWarningMessage] =
		useState(false);

	const { searchKeywords, searchArticles, searchAuthors } = useSearch();

	async function fetchKeywordsSuggestions(word) {
		const suggestedKeywords = await searchKeywords(word);

		setKeywordsSuggestions(suggestedKeywords);
	}

	async function fetchAuthorsSuggestions(word) {
		const suggestedAuthors = await searchAuthors(word);

		setAuthorsSuggestions(suggestedAuthors);
	}

	function onSelectKeywordSuggested(word) {
		if (!keywordsFiltered.includes(word)) {
			setKeywordsFiltered([...keywordsFiltered, word]);
		}
	}

	function onSelectAuthorSuggested(word) {
		if (!authorsFiltered.includes(word)) {
			setAuthorsFiltered([...authorsFiltered, word]);
		}
	}

	function onRemoveKeyword(word) {
		setKeywordsFiltered(
			keywordsFiltered.filter((selectedFilter) => selectedFilter !== word)
		);
	}

	function onRemoveAuthor(word) {
		setAuthorsFiltered(
			authorsFiltered.filter((selectedFilter) => selectedFilter !== word)
		);
	}

	async function onSearchArticles() {
		if (authorsFiltered.length > 0 || keywordsFiltered.length > 0) {
			setShouldRenderWarningMessage(false);
			setIsSearchingArticles(true);
			updateIsSearching(true);
			updateArticleList([]);
			setRelatedKeywords([]);
			try {
				const foundArticles = await searchArticles(
					keywordsFiltered,
					authorsFiltered,
					matchAllKeywords
				);
				updateArticleList(foundArticles.results);
				updateTotalArticles(foundArticles.total);

				const rankArray = [];
				for (let i = 0; i < foundArticles.keywordsRank.length; i += 1) {
					const keywordFrequency = {
						kw: foundArticles.keywordsRank[i][0],
						freq: foundArticles.keywordsRank[i][1],
					};
					rankArray.push(keywordFrequency);
				}
				setRelatedKeywords(rankArray);
				setIsSearchingArticles(false);
				updateIsSearching(false);
			} catch (e) {
				renderNotification(
					"error",
					"Error",
					"An error occurred while fetching articles. Please, try again."
				);
				setIsSearchingArticles(false);
				updateIsSearching(false);
				updateTotalArticles(0);
			}
		} else {
			setShouldRenderWarningMessage(true);
		}
	}

	return (
		<Tile>
			<Column>
				<Row>
					<Column>Filters</Column>
				</Row>

				<Row className="row">
					<Column>
						<TextInput
							onChange={(e) => fetchKeywordsSuggestions(e.target.value)}
							placeholder="Start typing to find keywords."
						/>
						{keywordsSuggestions.length > 0 ? (
							<Suggestions
								suggestions={keywordsSuggestions}
								addSuggestion={onSelectKeywordSuggested}
							/>
						) : null}
					</Column>
					<Column>
						<TextInput
							onChange={(e) => fetchAuthorsSuggestions(e.target.value)}
							placeholder="Start typing to find authors."
						/>
						{authorsSuggestions.length > 0 ? (
							<Suggestions
								suggestions={authorsSuggestions}
								addSuggestion={onSelectAuthorSuggested}
							/>
						) : null}
					</Column>
				</Row>

				<Row className="row">
					<Column>
						{keywordsFiltered.map((filter) => (
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
						{authorsFiltered.map((filter) => (
							<Tag
								type="blue"
								title={filter}
								filter
								onClose={() => onRemoveAuthor(filter)}
							>
								{" "}
								{filter}
							</Tag>
						))}
					</Column>
				</Row>
				<Row className="row">
					<Column>
						<FormGroup legendText="Find articles with...">
							<RadioButtonGroup
								legend="Group Legend"
								name="keywords"
								valueSelected="all"
							>
								<RadioButton
									defaultChecked
									id="all"
									labelText="All selected keywords"
									value="all"
									onClick={() => setMatchAllKeywords(true)}
								/>
								<RadioButton
									id="any"
									labelText="Any of the selected keywords"
									value="any"
									onClick={() => setMatchAllKeywords(false)}
								/>
							</RadioButtonGroup>
						</FormGroup>
					</Column>
				</Row>
				<Row>
					<Column>
						{isSearchingArticles ? (
							<ButtonSkeleton />
						) : (
							<>
								<Button
									renderIcon={Search32}
									onClick={onSearchArticles}
									kind="secondary"
								>
									Find Articles
								</Button>
								<Button
									renderIcon={Reset32}
									onClick={() => {
										setAuthorsFiltered([]);
										setKeywordsFiltered([]);
									}}
									kind="ghost"
								>
									Clear Inputs
								</Button>
							</>
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
				{relatedKeywords.length > 0 ? (
					<Row className="row-2">
						<Column>
							<span className="subtitle">Related keywords: </span>
							{relatedKeywords.map((kw, index) =>
								index === relatedKeywords.length ? (
									<span className="related-kw">{kw.kw}.</span>
								) : (
									<span className="related-kw	">{kw.kw}, </span>
								)
							)}
						</Column>
					</Row>
				) : null}
			</Column>
		</Tile>
	);
}
