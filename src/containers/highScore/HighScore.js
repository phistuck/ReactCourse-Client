import React, { Component } from 'react';
import Loader from '../../components/loader/Loader';
import axios from 'axios';
import cup from '../../assets/images/cup.png';

export default class HighScore extends Component {

  state = {
    users: null
};

  componentDidMount() {
    axios.get('/highscore')
      .then(res => {        
        this.setState({users: res.data});
      })
      .catch(error => console.log(error));
  }

  getHighScoreTable() {
    return (
      <div className="high-score-table">
        {
          this.state.users.map((user, i) => {
            return (
              <div className="high-score-element">
                <span className="high-score-item-seconds">{user.score}</span>
                <span className="high-score-item-name">{user.name}</span>
                <span className="high-score-item-index">{i + 1}</span>
              </div>
            )
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="container center">
        <h1 className="high-scroe-header">טבלת התותחים</h1>
        <img className="cup-img" src={cup}/>
        {this.state.users ? this.getHighScoreTable() : <Loader/>}
      </div>
    )
  }
}
