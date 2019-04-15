import React, { Component } from 'react';
import BookItem from './BookItem';
import axios from 'axios';


class Books extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    // TODO: add BASE_URL variable
    axios.get(`http://localhost:3000/books.json`)
      .then(res => {
        const books = res.data;
        this.setState({ books });
      })
  }

  render() {
    const books = this.state.books.map((book, i) => (
      <BookItem title={book.title}
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
