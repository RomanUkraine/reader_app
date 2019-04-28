import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
// TODO fix imports

import axios from 'axios';


class BookItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      selectedDay: new Date(),
      pages: 0
    };

    this.handleDayChange = this.handleDayChange.bind(this);

    // this.handleDayClick = this.handleDayClick.bind(this);
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
    }).then(res => {
      this.handleClose()
        // const user = res.data;
        // this.setState({ user });
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
    }).then(res => {
      console.log(res)
        // const user = res.data;
        // this.setState({ user });
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
          <Modal.Title>How much did you read (add book title) today?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup>
            <p>Pick a day:</p>
            <DayPickerInput onDayChange={ this.handleDayChange } />

            <FormControl type="number"
                         value={ this.state.pages }
                         onChange={ this.handlePageChange }
            />
          </InputGroup>
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
