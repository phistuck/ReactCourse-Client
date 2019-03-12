import React, { Component } from 'react';
import reactLogo from '../../assets/images/react.svg';

export default class Card extends Component {

  onCardClick = () => {
    console.log('clicked on blocked: ', this.props.isBlocked);
    if (!this.props.isBlocked) {
      this.props.onClick(this.props.cardId);
    }
  }
  
 /* onClick={this.onCardClick} and class function that perform the call*/
  render() {
    const flipedClass = this.props.isFliped ? 'flip' : null;
    return (
        <div className={`memory-card ${flipedClass}`}
             onClick={this.onCardClick} 
             style={{order: this.props.order}}>
            <img className="front-face" src={this.props.pictureSrc} alt='card-front-face'/>
            <img className="back-face" src={reactLogo} alt="React"/>
         </div>
    )
  }
}
