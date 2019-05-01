import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../helpers';

class CreateBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      description: '',
      public: false,
      redirect: false
    }
  }

  // TODO: add proptypes

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value })
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }

  handlePublicChange = (e) => {
    this.setState({ public: !this.state.public })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${BASE_URL}/books`, {
      book: {
        title: this.state.title,
        author: this.state.author,
        description: this.state.description,
        public: this.state.public
      }

    },
    {
      headers: {
        'X-User-Token': localStorage.getItem('userToken')
      }
    })
    .then(() => {
      this.setState({
        redirect: true
      })
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/'/>;
    }

    return(
      <div>
        <Card style={{ width: '40rem', margin: '0 auto' }}>
          <Card.Body>
            <Card.Title>Add Book</Card.Title>
            <Form onSubmit={this.handleSubmit.bind(this)}>

              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter book title"
                              onChange={this.handleTitleChange.bind(this)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Author</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter book author"
                              onChange={this.handleAuthorChange.bind(this)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter description"
                              onChange={this.handleDescriptionChange.bind(this)}
                              onKeyPress={e => {
                                if (e.key === 'Enter') {
                                  this.handleSubmit.bind(this)
                                }
                              }}
                />
              </Form.Group>

              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox"
                            label="Make public?"
                            onChange={this.handlePublicChange.bind(this)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Sumbit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default CreateBook;
