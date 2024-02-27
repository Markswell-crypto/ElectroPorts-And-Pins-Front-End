import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false); // State to control showing search results
    const [searchType, setSearchType] = useState('phones'); // Default search type

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (!searchTerm.trim()) {
            return;
        }
        try {
            const response = await fetch(`https://electroports-db.onrender.com/${searchType}?term=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            setSearchResults(data.results || []); // Ensure searchResults is an array
            setError(null);
            setShowResults(true); // Show search results after form submission
            onSearch(searchTerm); // Notify the parent component about the search term
        } catch (error) {
            console.error('Error searching:', error);
            setSearchResults([]);
            // setError('Failed to fetch search results. Please try again.');
        }
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    return (
        <Container>
            <Row className="justify-content-center mt-4 mb-3">
                <Col md={6}>
                    <Form onSubmit={handleSearchSubmit}>
                        <Form.Group controlId="searchForm" className="d-flex align-items-center mr-2">
                            <Form.Control
                                type="text"
                                placeholder="Search for an item..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Button variant="primary" type="submit" className="ml-3">
                                <FaSearch /> 
                            </Button>
                        </Form.Group>
                        <Form.Group controlId="searchTypeForm" className="d-flex align-items-center">
                            <Form.Control as="select" value={searchType} onChange={handleSearchTypeChange}>
                                <option value="phones">Phones</option>
                                <option value="laptops">Laptops</option>
                                <option value="accessories">Accessories</option>
                                <option value="sounddevices">Sound Devices</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            {showResults && (
                <Row className="mt-4">
                    {error && (
                        <Col>
                            <Alert variant="danger">{error}</Alert>
                        </Col>
                    )}
                    {searchResults && searchResults.length === 0 ? (
                        <Col>
                            <Alert variant="info">No items found matching your search.</Alert>
                        </Col>
                    ) : (
                        searchResults.map((result) => (
                            <Col key={result.id} md={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{result.title}</Card.Title>
                                        <Card.Text>{result.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            )}
        </Container>
    );
}

export default Search;