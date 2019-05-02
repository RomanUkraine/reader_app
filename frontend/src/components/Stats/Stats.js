import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { BASE_URL } from '../../helpers';

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: []
    };
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/stats.json`,
    {
      headers: {
        'X-User-Token': localStorage.getItem('userToken')
      }
    }).then(res => {
        this.setState({
          stats: res.data.data
        })
      })
  }

  render() {
    return (
      <div>
        <ListGroup>
        {this.state.stats.map(stat =>
          <ListGroup.Item>
            { stat.book.title } <cite className='blockquote-footer'> by { stat.book.author } </cite>
            Over the last 30 days you have read { stat.pages } pages
          </ListGroup.Item>
        )}
        </ListGroup>
      </div>
    );
  }
}

export default Stats;
