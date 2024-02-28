import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    const newSearchTerm = searchTerm;
    onSearch(newSearchTerm);
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <form onSubmit={handleSearch} className="d-flex">
        <input
          type="text"
          placeholder="Search Products of your choice👉"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control me-2"
        />
        <button type="submit" className="btn btn-primary">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;