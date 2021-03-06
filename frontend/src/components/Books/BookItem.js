import React, { Component } from 'react';
import DayPicker from 'react-day-picker/DayPicker';
import { Form, Card, Modal, Button } from 'react-bootstrap';
import { Alert, AlertContainer } from 'react-bs-notifier';
import axios from 'axios';
import { BASE_URL } from '../../helpers';
import 'react-day-picker/lib/style.css';

class BookItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showAlert: false,
      alertClass: '',
      message: '',
      selectedDay: undefined,
      pages: 0
    };
  }

  handleClose = () => {
    this.setState({ showModal: false });
  }

  handleShow = () => {
    this.setState({ showModal: true });
  }

  handleDayClick = (day, modifiers = {}) => {
    if (modifiers.disabled) {
      return;
    }
    this.setState({
      selectedDay: modifiers.selected ? undefined : day,
    });
  }

  handleShowAlert(alertClass, message=[]) {
    this.setState({
      showAlert: true,
      alertClass: alertClass,
      message: message
    });
  }

  handleDismissAlert() {
    this.setState({
      showAlert: false,
      pages: 0
    });
  }

  handlePageChange = (e) => {
    this.setState({ pages: e.target.value });
  }

  addReadEntry = (bookId) => {
    axios.post(`${BASE_URL}/books/${bookId}/read_entries` , {
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
      this.handleShowAlert('success', 'Read entry added!')
      this.handleClose()
    }).catch(e => {
      this.handleShowAlert('danger', e.response.data.error)
    })
  }

  addToMyBooks = () => {
    axios.post(`${BASE_URL}/assigned_books`, {
      assigned_book: {
        book_id: this.props.id
      }
    },
    {
      headers: {
        'X-User-Token': localStorage.getItem('userToken')
      }
    }).then(() => {
      this.handleShowAlert('success', 'Book assigned!')
    }).catch(e => {
      this.handleShowAlert('danger', e.response.data.error)
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
      <Modal show={ this.state.showModal } onHide={ this.handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>How many pages of {this.props.title} did you read?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Pick a day:</Form.Label>
              <DayPicker onDayClick={ this.handleDayClick }
                         selectedDays={this.state.selectedDay}
                         disabledDays={day => day > (new Date())}
              />
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

     const alert = (
      <AlertContainer>
        <Alert type={this.state.alertClass}
               headline={this.state.alertClass === 'success' ? 'Success' : 'Error'}
               onDismiss={() => { this.handleDismissAlert() }}
               timeout={2000}
        >
          {this.state.message}
        </Alert>
      </AlertContainer>
     )

    return(
      <div>
        { this.state.showAlert && alert }
        <Card style={{ width: '15rem' }}>
          <Card.Body>
            <Card.Title>{ this.props.title }</Card.Title>
            <p className='blockquote-footer'>by { this.props.author }</p>
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
