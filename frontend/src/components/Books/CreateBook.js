import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../../helpers';

class CreateBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      description: '',
      redirect: false
    }
  }

    // TODO: add error handling
    // TODO: add proptypes
    // TODO submit on Enter key press

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value })
  }

  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value })
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // TODO redirect to my-books after submit
    axios.post(`${BASE_URL}books`, {
      book: {
        title: this.state.title,
        author: this.state.author,
        description: this.state.description
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
    // TODO change inputs to bootstrap
    return(

      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Title:</label>
        <input
          type="text"
          onChange={this.handleTitleChange.bind(this)}
        />
        <label>Author:</label>
        <input
          type="text"
          onChange={this.handleAuthorChange.bind(this)}
        />
        <label>Description:</label>
        <input
          type="text"
          onChange={this.handleDescriptionChange.bind(this)}
        />
        <input type="submit" value="Add Book" />
        </form>
      </div>
    )
  }
}

export default CreateBook;
