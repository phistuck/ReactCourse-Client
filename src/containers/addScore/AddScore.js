import React, { Component } from "react";

class AddScore extends Component {
  state = {
    name: null
  };
  handleChange = e => {
    // console.log(e.target.id, e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <form className="add-score-form" onSubmit={this.handleSubmit}>
        <h1 className="add-score-title">אשריך שזכית לסיים את המשחק</h1>
        <hr/>
        <div className="add-score-main-wrapper">
          <input className="add-score-input" type="text" id="name" onChange={(e) => this.props.onNameChange(e)} />
          <label htmlFor="name">שם שחקן</label>
        </div>
      </form>
    );
  }
}

export default AddScore;
