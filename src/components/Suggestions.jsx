import React from "react";
import "./suggestions.scss";

export default function Suggestions({ suggestions, addSuggestion }) {
  return (
    <div className="wrapper">
      {suggestions.map((sugg) => (
        <span
          role="link"
          onKeyDown={() => addSuggestion(sugg)}
          onClick={() => addSuggestion(sugg)}
          className="suggested-kw"
          tabIndex={0}
        >
          {sugg}
        </span>
      ))}
    </div>
  );
}
