import React, { Component } from 'react';
import Board from '../board/Board';
import Timer from '../../components/timer/Timer';
import Modal from '../modal/Modal';
import AddScore from '../addScore/AddScore';
import axios from 'axios';

class Main extends Component {
  BOARD_SIZE = 12;
  state = {
    timer: 0,
    timerVariable: null,
    isShowBoard: false,
    isShowModal: false,
    playerName: ''
  };

  increaseTimer = () => {
    this.setState((prevState, props) => ({
      timer: prevState.timer + 1
    }));
  }

  onGameComplete = () => {
    clearInterval(this.state.timerVariable);
    setTimeout(() => this.setState({isShowModal: true, isShowBoard: false}), 2000); // to see the last card flip    
  }

  startNewGame = () => {
     // showBoard
    this.setState({isShowBoard: true});
    // startTimer
    const timer = setInterval( this.increaseTimer, 1000);
    //save the timer for close in the end
    this.setState({timerVariable: timer});
  }

  onNameChange = (e) => {
    console.log( e.target.value);
    this.setState({playerName: e.target.value});
  }

  sendScore = () => {
    const data = {name: this.state.playerName, score: this.state.timer};
    axios.post('/sendscore', data)
      .then(() => {
        // route the scores page
        this.props.history.push('/highscore');
      })
      .catch((error) => console.log(error));
  }

  closeModal =  () => {
    this.setState({isShowModal: false});
    this.sendScore();
  }

  // Todo: the timer is render each sec all the Board!!!, need to change the board to pureComponent
  render() {
    return (
      <div className="container">        
          <button className="btn-new-game" onClick={() => this.startNewGame()}>התחל משחק חדש</button>          
          <Timer time= {this.state.timer}/>
          {this.state.isShowBoard ? 
            <Board size={this.BOARD_SIZE} onGameComplete={this.onGameComplete}/> : null
          }
          <Modal 
              show={this.state.isShowModal} 
              handleOkClick={this.closeModal}
              okButtonLabel='שלח'>
              <AddScore onNameChange={this.onNameChange}/>
          </Modal>
      </div>
    );
  }
}

export default Main;
