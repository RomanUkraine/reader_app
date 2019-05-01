import React, { Component } from 'react';
import BookItem from './BookItem';
import axios from 'axios';
import { BASE_URL } from '../../helpers';

class Books extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/books.json`,
    {
      headers: {
        'X-User-Token': localStorage.getItem('userToken')
      }
    }).then(res => {
        const books = res.data;
        this.setState({ books });
      })
  }

  render() {
    const books = this.state.books.map((book, i) => (
      <BookItem id={book.id}
                title={book.title}
                description={book.description}
                author={book.author}
                key={i}
      />
    ))
    return (
      <div className={'row'}>
        {books}
      </div>
    );
  }
}

export default Books;
