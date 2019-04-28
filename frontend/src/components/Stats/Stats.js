import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/stats.json`,
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
        {this.state.stats.map(stat =>
        <React.Fragment>
          <Card style={{ width: '15rem' }}>
            <Card.Body>
              <Card.Title>{ stat.book.title } by { stat.book.author }</Card.Title>
              <Card.Text>
                { stat.book.description }
              </Card.Text>
            </Card.Body>
          </Card>
          <p>You read {stat.pages} pages over the last month</p>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Stats;
