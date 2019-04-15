import React from 'react';
import Card from 'react-bootstrap/Card';

const BookItem = (props) => {
  return(
    <div>
      <Card style={{ width: '15rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
          {/* TODO: restyle, fill with data, add 'add book' btn */}
        </Card.Body>
      </Card>
    </div>
  )
}

export default BookItem;