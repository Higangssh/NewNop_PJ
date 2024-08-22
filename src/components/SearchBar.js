import React from 'react';

const SearchBar = ({ onSearch, onSort }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="이름을 검색하세요..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="search-bar-buttons">
        <button className="btn btn-primary" onClick={() => onSort('asc')}>
          이름순으로 정렬
        </button>
        <button className="btn btn-secondary" onClick={() => onSort('desc')}>
          역순으로 정렬
        </button>
      </div>
    </div>
  );
};

export default SearchBar;


