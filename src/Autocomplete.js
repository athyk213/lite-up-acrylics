import React, { useState, useEffect, useRef } from "react";
import "./Autocomplete.css";

function Autocomplete({ searchInput, accessToken, onSuggestionClick }) {
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    async function fetchSuggestions() {
      const url = `https://api.spotify.com/v1/search?q=${searchInput}&type=artist&market=US&limit=5`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      const artists = data.artists.items.map((artist) => artist.name);
      setSuggestions(artists);
    }

    if (searchInput.length >= 1) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchInput, accessToken]);

  const handleSuggestionClick = (suggestion) => {
    setSuggestions([]);
    onSuggestionClick(suggestion);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ul className="autocomplete" ref={autocompleteRef}>
      {suggestions.map((suggestion) => (
        <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
          <div className="suggestion-container">{suggestion}</div>
        </li>
      ))}
    </ul>
  );
}

export default Autocomplete;
