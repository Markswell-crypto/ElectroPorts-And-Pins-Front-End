import { Card, Button } from 'react-bootstrap';

const ItemCard = ({ id, name, description, price, imageUrl, addToCart }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Price: ${price}</Card.Text>
        <Button variant="primary" onClick={() => addToCart({ id, name, price })}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
