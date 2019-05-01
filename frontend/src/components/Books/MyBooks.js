import React, { Component } from 'react';
import BookItem from './BookItem';
import axios from 'axios';
import { BASE_URL } from '../../helpers';

class MyBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/books/?my=true`,
    {
      headers: {
        'X-User-Token': localStorage.getItem('userToken')
      }
    }).then(res => {
        const books = res.data.data;
        this.setState({ books });
      })
  }

  render(){
    const myBooks = this.state.books.map((book, i) => (
      <BookItem id={book.id}
                title={book.attributes.title}
                description={book.attributes.description}
                author={book.attributes.author}
                key={i}
                myBooks={true}
      />
    ))

    return(
      <div className='row'>
        { myBooks }
      </div>
    )
  }
}

export default MyBooks;
