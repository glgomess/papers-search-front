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

export default function ArticlesFilter() {
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
      setIsSearchingArticles(true);
      setTimeout(() => {
        setIsSearchingArticles(false);
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
