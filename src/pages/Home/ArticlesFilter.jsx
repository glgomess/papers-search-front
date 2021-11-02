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
	const [filters, setFilters] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [matchAllKeywords, setMatchAllKeywords] = useState(true);
	const [isSearchingArticles, setIsSearchingArticles] = useState(false);
	const [shouldRenderWarningMessage, setShouldRenderWarningMessage] =
		useState(false);

	const { searchKeywords, searchArticles } = useSearch();

	async function fetchSuggestions(word) {
		const suggestedKeywords = await searchKeywords(word);

		setSuggestions(suggestedKeywords);
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

	async function onSearchArticles() {
		if (filters.length > 0) {
			setShouldRenderWarningMessage(false);
			setIsSearchingArticles(true);
			updateIsSearching(true);
			updateArticleList([]);
			try {
				const foundArticles = await searchArticles(filters, matchAllKeywords);
				updateArticleList(foundArticles.results);
				updateTotalArticles(foundArticles.total);
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
							placeholder="Start typing to find keywords."
						/>
					</Column>
				</Row>
				{suggestions.length > 0 ? (
					<Row>
						<Column>
							<Suggestions
								suggestions={suggestions}
								addSuggestion={onSelectKeywordSuggested}
							/>
						</Column>
					</Row>
				) : null}

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
						<FormGroup legendText="Find articles with...">
							<RadioButtonGroup
								defaultSelected="radio-1"
								legend="Group Legend"
								name="radio-button-group"
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
									onClick={() => setFilters([])}
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
			</Column>
		</Tile>
	);
}
