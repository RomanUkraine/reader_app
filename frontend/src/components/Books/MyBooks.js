import React, { Component } from 'react';
import BookItem from './BookItem';
import axios from 'axios';

class MyBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3000/books/?my=true', // TODO base  url
    {
      headers: {
        'X-User-Token': localStorage.getItem('userToken')
      }
    }).then(res => {
        const books = res.data;
        this.setState({ books });
      })
  }

  render(){
    const myBooks = this.state.books.map((book, i) => (
      <BookItem id={book.id}
                title={book.title}
                description={book.description}
                author={book.author}
                key={i}
                myBooks={true}
      />
    ))

    return(
      <div className={'row'}>
        { myBooks }
      </div>
    )
  }
}

export default MyBooks;
