import React, { useContext, useState } from 'react';
import Store from '../../context';

import API_CONFIG from '../../ApiConfig';
import Axios from 'axios';
import Item from './item';

export default function Search() {
  const { state, dispatch } = useContext(Store);

  const [searchResults, setSearchResults] = useState(state.search_results || []);
  const [searchQuery, setSearchQuery] = useState(state.search_query || '');

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value);
  }

  async function handleSearch() {
    dispatch({ type: 'updateSearchQuery', payload: searchQuery });

    const response = await Axios({
      method: 'get',
      url: API_CONFIG.yt_search_endpoint({ searchQuery }),
      responseType: 'json'
    });

    const items = (response.data.items || []).filter(_ => _.id.kind === 'youtube#video');

    setSearchResults(items);
    dispatch({ type: 'updateSearchResults', payload: items });
  }

  function handleSubmit(e) {
    if (e.keyCode === 13 && e.target.value.length > 3) handleSearch();
  }

  return <div className="playlist-content tab-pane fade" id="search" role="tabpanel" aria-labelledby="search-tab">
    <div className="list-group search-control">
      <div className="list-group-item search-field">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchQuery}
          onKeyUp={handleSubmit}
          onChange={handleSearchQueryChange} />
      </div>
      {searchResults.map(result => <Item {...result} />)}
    </div>
  </div>;
}