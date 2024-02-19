import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle form submission
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Logic to filter items based on search term
        // This can be implemented using JavaScript array methods like filter()
        // Here I'm just setting the searchResults state to an empty array for demonstration purposes
        setSearchResults([]);
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form onSubmit={handleSearchSubmit}>
                        <Form.Group controlId="searchForm">
                            <Form.Control
                                type="text"
                                placeholder="Search for an item..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-4">
                {searchResults.map((result) => (
                    <Col key={result.id} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{result.title}</Card.Title>
                                <Card.Text>{result.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Search;
