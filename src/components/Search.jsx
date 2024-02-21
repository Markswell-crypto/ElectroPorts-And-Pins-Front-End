import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle form submission
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <Form onSubmit={handleSearchSubmit} inline>
            <Form.Control
                type="text"
                placeholder="Search for an item..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="mr-sm-2"
            />
            <Button variant="outline-light" type="submit">Search</Button>
        </Form>
    );
}

export default Search;