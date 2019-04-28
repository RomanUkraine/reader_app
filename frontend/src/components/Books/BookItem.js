import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Form, Card, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import 'react-day-picker/lib/style.css';

class BookItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      selectedDay: new Date(),
      pages: 0
    };

    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day });
  }

  handlePageChange = (e) => {
    this.setState({ pages: e.target.value });
  }

  handleDateChange = (value, formattedValue) => {
    this.setState({
      dateValue: value,
      formattedValue: formattedValue
    });
  }


  // TODO add notification after entry successfully added
  // TODO change date format not to include hours

  addReadEntry = (bookId) => { // TODO add base url
    axios.post('http://localhost:3000/books/' + bookId + '/read_entries' , {
      read_entry: {
        book_id: bookId,
        pages: this.state.pages,
        date: this.state.selectedDay
      }
    },
    {
      headers: {
        'X-User-Token': localStorage.getItem('userToken')
      }
    }).then(() => {
      this.handleClose()
      })
    }

  addToMyBooks = () => { // TODO add base url
    axios.post('http://localhost:3000/assigned_books/', {
      assigned_book: {
        book_id: this.props.id
      }
    },
    {
      headers: {
        'X-User-Token': localStorage.getItem('userToken')
      }
    }).then((res) => {
      // TODO flash!!!
    })
  }

  render(){
    const button = this.props.myBooks ?
      <Button variant="primary" onClick={() => { this.handleShow() }}>
        Add read entry!
      </Button>
    :
      <Button variant="primary" onClick={ this.addToMyBooks }>
        Add to my books!
      </Button>

    const modal = this.props.myBooks ?
      <Modal show={ this.state.show } onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>How many pages of {this.props.title} did you read?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Pick a day:</Form.Label>
              <DayPickerInput onDayChange={ this.handleDayChange } />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Pages</Form.Label>
              <Form.Control type="number"
                            placeholder="Pages"
                            onChange={ this.handlePageChange }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { this.addReadEntry(this.props.id) }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
     : null

    return(
      <div>
        <Card style={{ width: '15rem' }}>
          <Card.Body>
            <Card.Title>{ this.props.title }</Card.Title>
            <Card.Text>
              { this.props.description }
            </Card.Text>
            { button }
          </Card.Body>
        </Card>

        { modal }

      </div>
    )
  }
}

export default BookItem;
