import React, { Component } from 'react';

class BMRModal extends Component {

  render() {
    return (
      <div id="BMRModal" onClick={this.props.exitModal}>
        <div id="BMRModalContent">
          <p>Your goal is:</p>
          <p>{this.props.BMR} calories!</p>
        </div>
      </div>
    );
  }

}

export default BMRModal;
