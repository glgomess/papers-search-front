import React, { useState, useEffect } from 'react';
import {
  Row,
  Column,
  Tile,
  TextInput,
  Tag,
  Button,
} from 'carbon-components-react';
import './articles-filter.scss';

export default function ArticlesFilter() {
  const [currentFilter, setCurrentFilter] = useState('');
  const [filters, setFilters] = useState([]);

  function addFilter() {
    setFilters([...filters, currentFilter]);
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
              onChange={(e) => setCurrentFilter(e.target.value)}
              placeholder="Type in a keyword to filter articles."
            />
          </Column>
        </Row>
        <Row className="row">
          <Column>
            <Button onClick={addFilter} kind="secondary" size="small">
              Add Filter
            </Button>
          </Column>
        </Row>
        <Row className="row">
          <Column>
            {filters.map((filter) => (
              <Tag type="cool-gray" title={filter} filter>
                {' '}
                {filter}
              </Tag>
            ))}
          </Column>
        </Row>
      </Column>
    </Tile>
  );
}
