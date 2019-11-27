import React, { Component } from 'react';
import SpinnerGif from '../../assets/ajax-loader.gif';

class Spinner extends Component {
  render() {
    return (
      <img src={SpinnerGif} alt="AJAX loader" />
    );
  }
}

export default Spinner;
